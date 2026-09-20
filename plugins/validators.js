const rules_map = {

    required: (value) => !!value || 'این فیلد الزامی است',

    phone: (value) => !value || /^09\d{9}$/.test(String(value)) || 'شماره موبایل معتبر نیست',
    email: (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)) || 'ایمیل معتبر نیست',
    min8: (value) => !value || String(value).length >= 8 || 'حداقل باید ۸ کاراکتر باشد',
    max50: (value) => !value || String(value).length <= 50 || 'حداکثر باید ۵۰ کاراکتر باشد',
    national_code: (value) => !value || /^\d{10}$/.test(String(value)) || 'کد ملی باید ۱۰ رقم باشد',
    password: (value) => !value || /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(value) || 'رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، حروف کوچک، عدد و کاراکتر ویژه باشد',
    birth_date: (value) => !!value || 'تاریخ تولد الزامی است',
    gender: (value) => !!value || 'انتخاب جنسیت الزامی است',
    province: (value) => !!value || 'انتخاب استان الزامی است',
    city: (value) => !!value || 'انتخاب شهر الزامی است',
    confirm_password: (value, rule_context) => !value || value === rule_context.password || 'تکرار رمز عبور صحیح نیست'
}

export default (context, inject) => {
    const parse_rules = (rules_input, rule_context = {}) => {
        if (!rules_input) return []
        if (Array.isArray(rules_input)) {
            return rules_input
        }

        return rules_input
            .split(',')
            .map(rule_name => {
                const rule = rules_map[rule_name.trim()]
                if (!rule) return null
                return value => rule(value, rule_context)})
            .filter(Boolean)
    }

    inject('parseRules', parse_rules)
}