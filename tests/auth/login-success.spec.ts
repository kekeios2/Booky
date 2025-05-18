// import { test, expect } from '../fixtures';
// import { hash } from 'bcryptjs';

// test('User can login successfully with correct credentials', async ({ page, prismaContext }) => {
//   const unique = Math.random().toString(36).substring(2, 10);
//   const email = `login_test_${unique}@resend.dev`;
//   const password = 'TestPass123!';
//   const univId = Math.floor(Math.random() * 10000000);
  
//   let userId;
  
//   try {
//     // Create a test user
//     const hashedPassword = await hash(password, 10);
//     const user = await prismaContext.user.create({
//       data: {
//         email,
//         fullName: 'Login Test',
//         password: hashedPassword,
//         univId,
//         activated: true,
//       },
//     });
    
//     userId = user.id;
    
//     // Navigate to login page
//     await page.goto('http://localhost:3000/login');
    
//     // Fill login form
//     await page.fill('input[name="email"]', email);
//     await page.fill('input[name="password"]', password);
//     await page.click('button[type="submit"]');
    
//     // Wait for navigation
//     await page.waitForURL('**/', { timeout: 10000 });
    
//     // Verify user is logged in
//     await expect(page.locator('text=search')).toBeVisible({ timeout: 10000 });
// } finally {
//     // Clean up test data
//     if (userId) {
//       try {
//         await prismaContext.user.delete({
//           where: { id: userId }
//         });
//       } catch (error) {
//         console.error('Error cleaning up test user:', error);
//       }
//     }
//   }
// });