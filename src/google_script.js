/**
 * Web app endpoint for korolkov.pro contact form (App.jsx `Contact`).
 * Replacement deployed 2026-08-11 — the original endpoint (a different
 * Apps Script project/account we could no longer locate) was being spammed
 * directly via raw POST, bypassing the site entirely. See anti-spam notes
 * below. Recipient stays denys.korolkov@gmail.com to match prior behavior.
 */

const RECIPIENT_EMAIL = 'denys.korolkov@gmail.com';
const ALLOWED_ORIGIN = '*';

// Anti-spam config. Bots found the OLD endpoint's public URL (sitting in
// this public GitHub repo) and blasted it with a fixed payload shape
// {name, email, projectType, message} — random name, gmail dot-trick
// address, projectType defaulted to the dropdown's first option, message
// = a bare phone number. These checks don't stop a targeted attacker who
// reads the current bundle, but they kill generic replay bots that only
// know the old field shape and don't send FORM_GUARD.
const FORM_GUARD_TOKEN = 'kp-guard-2026-08'; // must match hidden field sent by Contact form in App.jsx
const RATE_LIMIT_PER_EMAIL_PER_HOUR = 3;
const RATE_LIMIT_GLOBAL_PER_MINUTE = 20;

function doOptions(e) {
  return buildResponse_(200, { success: true, info: 'Preflight placeholder.' });
}

/**
 * Expects JSON body: { name, email, projectType, message, website, formGuard }
 */
function doPost(e) {
  try {
    console.log('doPost event:', JSON.stringify(e));

    if (!e || !e.postData || !e.postData.contents) {
      return buildResponse_(400, { success: false, error: 'Missing request body.' });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (errParse) {
      console.log('JSON parse error:', errParse);
      return buildResponse_(400, { success: false, error: 'Invalid JSON body.' });
    }

    console.log('Parsed payload:', JSON.stringify(data));

    var validationError = validatePayload_(data);
    if (validationError) {
      return buildResponse_(400, { success: false, error: validationError });
    }

    // Bot check. Return a fake success so scripts blindly replaying the old
    // payload shape don't get a signal to adjust — but never send the email.
    if (isLikelySpam_(data)) {
      console.log('Rejected as spam (silent):', JSON.stringify(data));
      return buildResponse_(200, { success: true });
    }

    var rateLimitError = checkRateLimit_(String(data.email || '').trim());
    if (rateLimitError) {
      console.log('Rate limited:', rateLimitError);
      return buildResponse_(200, { success: true });
    }

    var name = String(data.name || '').trim();
    var email = String(data.email || '').trim();
    var projectType = data.projectType ? String(data.projectType).trim() : '';
    var message = data.message ? String(data.message).trim() : '';
    var timestamp = new Date().toISOString();

    var subject = projectType
      ? '📬 New Site Inquiry: ' + projectType
      : '📬 New Site Inquiry';

    var plainBody =
      'New inquiry from ' + name + ' (' + email + ')\n\n' +
      (projectType ? 'Project type: ' + projectType + '\n' : '') +
      (message ? '\nMessage:\n' + message + '\n' : '') +
      'Timestamp: ' + timestamp + '\n' +
      // Marker for the Gmail filter — only this endpoint's mail carries it,
      // so "New Site Inquiry" mail WITHOUT this line means the old orphaned
      // endpoint is still alive and can be safely auto-skipped.
      'Source: korolkov.pro contact form (v2, hardened 2026-08-11)';

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      body: plainBody,
      replyTo: email
    });

    console.log('Email sent for inquiry from:', email);
    return buildResponse_(200, { success: true });
  } catch (err) {
    console.log('Unhandled error in doPost:', err);
    return buildResponse_(500, { success: false, error: 'Internal server error.' });
  }
}

/**
 * Heuristic spam detection for generic replay bots.
 */
function isLikelySpam_(data) {
  if (data.website) return true; // honeypot
  if (String(data.formGuard || '') !== FORM_GUARD_TOKEN) return true; // missing token = not our form

  // Content signature match: current spam wave sends a message body
  // that's nothing but a phone number (7-20 chars, digits/spaces/dashes only).
  var body = String(data.message || '').trim();
  if (body && /^[\d\s().+-]{7,20}$/.test(body)) return true;

  return false;
}

function checkRateLimit_(email) {
  var cache = CacheService.getScriptCache();

  var normalizedEmail = normalizeEmail_(email);
  var emailKey = 'rl_email_' + normalizedEmail;
  var emailCount = Number(cache.get(emailKey) || 0) + 1;
  cache.put(emailKey, String(emailCount), 3600);
  if (emailCount > RATE_LIMIT_PER_EMAIL_PER_HOUR) {
    return 'Per-email limit exceeded: ' + normalizedEmail;
  }

  var minuteKey = 'rl_global_' + Math.floor(Date.now() / 60000);
  var minuteCount = Number(cache.get(minuteKey) || 0) + 1;
  cache.put(minuteKey, String(minuteCount), 120);
  if (minuteCount > RATE_LIMIT_GLOBAL_PER_MINUTE) {
    return 'Global per-minute limit exceeded.';
  }

  return null;
}

function normalizeEmail_(email) {
  var parts = String(email || '').toLowerCase().trim().split('@');
  if (parts.length !== 2) return String(email || '').toLowerCase().trim();
  var local = parts[0];
  var domain = parts[1];
  if (domain === 'gmail.com' || domain === 'googlemail.com') {
    local = local.split('+')[0].replace(/\./g, '');
  }
  return local + '@' + domain;
}

function validatePayload_(data) {
  if (!data) return 'Missing payload.';

  var name = String(data.name || '').trim();
  var email = String(data.email || '').trim();

  if (!name) return 'Name is required.';
  if (!email) return 'Email is required.';

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) return 'Email format is invalid.';

  return null;
}

function buildResponse_(statusCode, obj) {
  var payload = JSON.stringify(obj);
  return ContentService.createTextOutput(payload).setMimeType(ContentService.MimeType.JSON);
}
