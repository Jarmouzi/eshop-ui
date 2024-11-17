const { COMPANY_NAME, SITE_NAME } = process.env;

export default function Copyright() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2024 + (currentYear > 2024 ? `-${currentYear}` : '');
  const copyrightName = COMPANY_NAME || SITE_NAME || '';

  return (
    <p className="text-center text-gray-500 text-xs" suppressHydrationWarning>
       &copy; {`${copyrightDate} تمامی حقوق این سامانه متعلق به ${copyrightName} می باشد.`}
    </p>
  )

}
