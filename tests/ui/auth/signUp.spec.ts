import {test, expect} from '@playwright/test';
import {LoginPage, SignUpPage, ForgotPasswordPage} from '../../../pages';
import {SignUpFlow} from '../../../flows/auth/SignUpFlow';
import {Generator} from '../../../utils/helper/Generator';

test.describe('Sign up page', () => {
    let loginPage: LoginPage;
    let signUpPage: SignUpPage;
    let forgotPasswordPage: ForgotPasswordPage;
    let signUpFlow: SignUpFlow;

    test.beforeEach('Navigate to sign up page', async ({page}) => {
        signUpFlow = new SignUpFlow(page);
        signUpPage = new SignUpPage(page);
        loginPage = new LoginPage(page);
        forgotPasswordPage = new ForgotPasswordPage(page);

        await signUpFlow.NavigateToSignUpPageFlow();
    });

    test('Navigate to login page', async ({page}) => {
        await signUpFlow.NavigateToLoginPageFlow();
    })

    test('Input name with all fields filled with valid data', async ({page}) => {
        await signUpFlow.InputNameFlow('Cikiii');
    });

    test('Input name only', async ({page}) => {
        await signUpFlow.InputNameOnlyFlow('Cikiii');
    });

    test('Input valid email with all fields filled with valid data', async ({page}) => {
        await signUpFlow.InputEmailFlow();
    });

    test('Input invalid email', async ({page}) => {
        await signUpFlow.InputInvalidEmailFlow('fildzah@com');
    });

    test('Input valid email only', async ({page}) => {
        await signUpFlow.InputEmailOnlyFlow('andhika.bagaskara3@gmail.com');
    });

    test('Input phone number with all fields filled with valid data', async ({page}) => {
        await signUpFlow.InputPhoneNumberFlow();
    });

    test('Input invalid phone number', async ({page}) => {
        await signUpFlow.InputInvalidPhoneNumberFlow('11223344556677889900');
    });

    test('Input valid phone number only', async ({page}) => {
        await signUpFlow.InputPhoneNumberOnlyFlow('8123456789');
    });

    test('Input valid password', async ({page}) => {
        await signUpFlow.InputPasswordFlow('Yoshiki29!');
    });

    test('Input invalid password', async ({page}) => {
        await signUpFlow.InputInvalidPasswordFlow('yoshiki, 12345678');
    });

    test('Input valid password only', async ({page}) => {
        await signUpPage.inputPassword('Yoshiki29!');

        await expect(signUpPage.passwordInput).toHaveValue('Yoshiki29!');
        await expect(signUpPage.signUpButton).toBeDisabled();
    });

    test('Input matching confirm password', async ({page}) => {
        await signUpFlow.InputMatchingConfirmPasswordFlow('Yoshiki29!');
    });

    test('Input not matching confirm password', async ({page}) => {
        await signUpFlow.InputNotMatchingConfirmPasswordFlow('Yoshiki29!', 'Yoshiki29!1');
    });

    test('Click sign up button', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();
        await expect(page.locator('span', {hasText: 'Account'})).toBeVisible();
    });

    test.skip('Click sign up with Google button', async ({page}) => {
        await signUpPage.clickContinueWithGoogleButton();
    });

    test.skip('Input valid OTP', async ({page}) => {

    });

    test('Input invalid OTP', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();

        await forgotPasswordPage.inputOTP('111111');
        await forgotPasswordPage.clickContinueButton();

        await expect(page.getByRole('heading', {name: 'OTP Verification Failed'})).toBeVisible();
    });

    test.skip('Resend OTP', async ({page}) => {
        const name = Generator.randomNameGenerator();
        const email = Generator.randomEmailGenerator();
        const phoneNumber = Generator.randomPhoneNumberGenerator();
        const password = Generator.randomPasswordGenerator();

        await signUpPage.inputName(name);
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber(phoneNumber);
        await signUpPage.inputPassword(password);
        await signUpPage.inputConfirmPassword(password);
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Successful!' })).toBeVisible();

        await forgotPasswordPage.clickResendButton();
        await expect(page.getByRole('heading', {name: 'OTP Resent'})).toBeVisible();
    });

    test('Sign up with registered email', async ({page}) => {
        await signUpPage.inputName('Cikiii');
        await signUpPage.inputEmail('fildzaharistaaa@gmail.com');
        await signUpPage.inputPhoneNumber('89610431828');
        await signUpPage.inputPassword('Yoshiki29!');
        await signUpPage.inputConfirmPassword('Yoshiki29!');
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Failed' })).toBeVisible();
    });

    test('Sign up with registered phone number', async ({page}) => {
        const email = Generator.randomEmailGenerator();

        await signUpPage.inputName('Cikiii');
        await signUpPage.inputEmail(email);
        await signUpPage.inputPhoneNumber('8123456789');
        await signUpPage.inputPassword('Yoshiki29!');
        await signUpPage.inputConfirmPassword('Yoshiki29!');
        await signUpPage.clickSignUpButton();

        await expect(page.getByRole('heading', { name: 'Registration Failed' })).toBeVisible();
    });
});