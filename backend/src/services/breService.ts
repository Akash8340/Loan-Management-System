export const runBRE = (
    dob: Date,
    salary: number,
    employmentMode: string,
    pan: string
) => {

    const today = new Date();

    let age =
        today.getFullYear() -
        new Date(dob).getFullYear();

    if (age < 23 || age > 50) {
        return {
            success: false,
            message: "Age must be between 23 and 50"
        };
    }

    if (salary < 25000) {
        return {
            success: false,
            message: "Salary below 25000"
        };
    }

    const panRegex =
        /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!panRegex.test(pan)) {
        return {
            success: false,
            message: "Invalid PAN"
        };
    }

    if (employmentMode === "UNEMPLOYED") {
        return {
            success: false,
            message: "Unemployed applicant"
        };
    }

    return {
        success: true
    };
};