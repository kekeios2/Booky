// import { test, expect } from '@playwright/test';

// test('User can register successfully', async ({ page }) => {
//   const email = `user${Date.now()}@example.com`;
//   const univId = Math.floor(Math.random() * 10000000);

//   await page.goto('http://localhost:3000/register');

//   await page.fill('input[name="fullName"]', 'Test User');
//   await page.fill('input[name="email"]', email);
//   await page.fill('input[name="password"]', 'TestPass123!');
//   await page.fill('input[name="confirmPassword"]', 'TestPass123!');
//   await page.fill('input[name="univId"]', univId.toString());

//   // فرض الإرسال مباشرة لضمان الاستجابة
//   await page.evaluate(() => {
//     const form = document.querySelector('form');
//     if (form) form.dispatchEvent(new SubmitEvent('submit', { bubbles: true, cancelable: true }));
//   });

//   // انتظر إعادة التوجيه
//   await page.waitForURL((url) => url.pathname.includes('/checkEmail'));

//   // تحقق من ظهور نص التحقق
//   await expect(page.locator('text=check your email', { hasText: /check/i })).toBeVisible();
// });
