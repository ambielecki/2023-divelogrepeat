class ValidationProvider {
    validateEmail(test_email) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(test_email))
    }

    validateMinLength(test, length) {
        return test.length >= length;
    }

    validateMaxLength(test, length) {
        return test.length <= length;
    }

    validateMatch(test_1, test_2) {
        return test_1 === test_2;
    }
}

export default new ValidationProvider();