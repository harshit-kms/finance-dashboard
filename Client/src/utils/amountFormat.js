export const formatNumber = (value) => {
    // Remove any existing commas from the input
    let cleanValue = String(value).replace(/,/g, '');

    // Check if the input is a valid number
    if (isNaN(cleanValue)) {
        return '0.00';
    }

    // Convert to a number and fix to 2 decimal places
    let number = Number(cleanValue);
    let formattedValue = number.toFixed(2);

    // // Split the number into integer and decimal parts
    // let parts = formattedValue.split('.');
    // let integerPart = parts[0];
    // let decimalPart = parts[1];

    // // Add commas to the integer part
    // integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // // Combine integer and decimal parts
    // formattedValue = integerPart + '.' + decimalPart;

    // // Check if the total length (including decimal point and potential negative sign) exceeds 11
    // if (formattedValue.replace(/[,\-]/g, '').length > 11) {
    //     // If it does, truncate and add ellipsis
    //     let isNegative = number < 0;
    //     let truncatedInteger = isNegative ? integerPart.slice(1, 8) : integerPart.slice(0, 8);
    //     formattedValue = (isNegative ? '-' : '') + truncatedInteger + '...';
    // }

    return formattedValue;
};