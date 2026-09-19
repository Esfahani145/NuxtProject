const rules_map = {
    required: (v) => !!v || 'این فیلد الزامی است',
    phone: (v) => !v || /^09\d{9}$/.test(v) || 'شماره موبایل معتبر نیست',
    email: (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'ایمیل معتبر نیست',
    min8: (v) => !v || v.length >= 8 || 'حداقل باید ۸ کارکتر باشد',
    max50: (v) => !v || v.length <= 50 || 'حداکثر باید ۵۰ گارکتر باشد',
    natioal_code: (v) =>  /^\d{10}$/.test(v) || 'کد ملی باید ۱۰ رقم باشد',
    password: (v) => !v || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(v) || 'رمز عبور باید حداقل ۸ کارکتر و شامل حروف بزرگ، حروف کوچک، عدد و کارکتر ویژه باشد'
}

export default (context, inject) => {
    const parse_rules = (rules_input) => {
        if (!rules_input) {
            return []
        }
        if (Array.isArray(rules_input)) {
            return rules_input
        }
        return rules_input
            .split(',')
            .map(rule => rules_map[rule.trim()])
            .filter(Boolean)
    }
    inject('parseRules', parse_rules)
}