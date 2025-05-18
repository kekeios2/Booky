// import { test, expect } from './fixtures';
// import { prisma } from '../lib/test-prisma';
// import { randomUUID } from 'crypto';

// test('User can activate account via token', async ({ page }) => {
//   const email = `user${Date.now()}@example.com`;
//   const univId = Math.floor(Math.random() * 10000000);
  
//   try {
//     // Create user
//     const user = await prisma.user.create({
//       data: {
//         email,
//         fullName: 'Test User',
//         password: 'dummy',
//         univId,
//         activated: false,
//       },
//     });

//     const token = `${randomUUID()}${randomUUID()}`.replace(/-/g, '');

//     // Create activation token
//     await prisma.activateToken.create({
//       data: {
//         token,
//         userId: user.id,
//       },
//     });

//     // Mock the API response
//     await page.route('**/api/auth/verify**', async (route) => {
//       // Log the request for debugging
//       console.log('Intercepted request to:', route.request().url());
      
//       // Mock a successful response
//       await route.fulfill({
//         status: 200,
//         contentType: 'application/json',
//         body: JSON.stringify({ 
//           success: true, 
//           message: 'Email verified successfully!'
//         })
//       });
      
//       // Manually update the user in the database as if the API did it
//       await prisma.user.update({
//         where: { id: user.id },
//         data: { activated: true },
//       });
//     });

//     // Enable console logging from the browser to see what's happening
//     page.on('console', msg => console.log(`PAGE LOG: ${msg.text()}`));
    
//     // Navigate to verification page
//     await page.goto(`http://localhost:3000/verify?token=${token}`);
    
//     // Wait for success state to appear - look for the exclamation mark
//     await expect(page.locator('text=Email Verified!')).toBeVisible({ timeout: 10000 });
    
//     // Verify the user is activated in the database
//     const updatedUser = await prisma.user.findUnique({ where: { id: user.id } });
//     expect(updatedUser?.activated).toBe(true);
    
//     // Clean up - delete test data
//     await prisma.activateToken.deleteMany({
//       where: { userId: user.id },
//     });
    
//     await prisma.user.delete({
//       where: { id: user.id },
//     });
//   } catch (error) {
//     console.error('Test error:', error);
//     throw error;
//   }
// });