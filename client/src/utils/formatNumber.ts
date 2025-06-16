interface IFormatNumber {
    number: string | number | bigint;
    decimals? : number | string;
}
const formatNumber = ({ number, decimals = 18 }: IFormatNumber): string => {
    const num = Number(number);
    if (isNaN(num)) {
        return "0";
    }
    return Number(num / 10 ** Number(decimals)).toFixed(4);
};
export default formatNumber;
