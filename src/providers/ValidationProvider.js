class ValidationProvider {
    validateEmail(test_email) {
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(test_email))
    }
}

export default new ValidationProvider();