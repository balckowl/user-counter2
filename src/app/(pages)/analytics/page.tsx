export default async function Page() {

    const url = "https://script.google.com/macros/s/AKfycbypqaKM8QC98cu3a6Ntka8xclr-_6Xi71Y0Gb2OfOeMmgKKEQ2b1oqG3EcPI-tECF0D/exec?limit=1";
    const res = await fetch(url);
    const data = await res.json()

    console.log(JSON.stringify(data))

    return (
        <div>Page</div>
    );
}
