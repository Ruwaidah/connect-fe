const Icon = ({ kind }) => {

    if (kind === "user") {
        return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#ffffff" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="#ffffff" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
    }

    if (kind === "mail") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/70">
                <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="2" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
        );
    }
    if (kind === "lock") {
        return (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/70">
                <path
                    d="M7 11V8a5 5 0 0 1 10 0v3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
                <path d="M6 11h12v10H6V11Z" stroke="currentColor" strokeWidth="2" />
            </svg>
        );
    }
    if (kind === "eye") {
        return (
            <svg fill="#000000" height="18" width="18" viewBox="0 0 32 32" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.112,18.784l-2.153,2.156c-0.585,0.586 -0.585,1.536 0.001,2.121c0.586,0.585 1.536,0.585 2.121,-0.001l2.666,-2.668c1.898,0.983 4.19,1.806 6.773,2.041l0,3.567c0,0.828 0.672,1.5 1.5,1.5c0.828,-0 1.5,-0.672 1.5,-1.5l0,-3.571c2.147,-0.201 4.091,-0.806 5.774,-1.571l3.199,3.202c0.585,0.586 1.535,0.586 2.121,0.001c0.586,-0.585 0.586,-1.535 0.001,-2.121l-2.579,-2.581c2.59,-1.665 4.091,-3.369 4.091,-3.369c0.546,-0.622 0.485,-1.57 -0.137,-2.117c-0.622,-0.546 -1.57,-0.485 -2.117,0.137c0,-0 -4.814,5.49 -11.873,5.49c-7.059,0 -11.873,-5.49 -11.873,-5.49c-0.547,-0.622 -1.495,-0.683 -2.117,-0.137c-0.622,0.547 -0.683,1.495 -0.137,2.117c0,0 1.175,1.334 3.239,2.794Z"></path><g id="Icon"></g></g></svg>
        )
    }

    if (kind === "eyeOff") {
        return <svg viewBox="0 0 24 24" height="18" width="18" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5C8.24261 5 5.43602 7.4404 3.76737 9.43934C2.51521 10.9394 2.51521 13.0606 3.76737 14.5607C5.43602 16.5596 8.24261 19 12 19C15.7574 19 18.564 16.5596 20.2326 14.5607C21.4848 13.0606 21.4848 10.9394 20.2326 9.43934C18.564 7.4404 15.7574 5 12 5Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
    }
    if (kind = "search") {
        return <svg viewBox="0 -0.5 25 25" height="18" width="18" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M7.30524 15.7137C6.4404 14.8306 5.85381 13.7131 5.61824 12.4997C5.38072 11.2829 5.50269 10.0233 5.96924 8.87469C6.43181 7.73253 7.22153 6.75251 8.23924 6.05769C10.3041 4.64744 13.0224 4.64744 15.0872 6.05769C16.105 6.75251 16.8947 7.73253 17.3572 8.87469C17.8238 10.0233 17.9458 11.2829 17.7082 12.4997C17.4727 13.7131 16.8861 14.8306 16.0212 15.7137C14.8759 16.889 13.3044 17.5519 11.6632 17.5519C10.0221 17.5519 8.45059 16.889 7.30524 15.7137V15.7137Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11.6702 7.20292C11.2583 7.24656 10.9598 7.61586 11.0034 8.02777C11.0471 8.43968 11.4164 8.73821 11.8283 8.69457L11.6702 7.20292ZM13.5216 9.69213C13.6831 10.0736 14.1232 10.2519 14.5047 10.0904C14.8861 9.92892 15.0644 9.4888 14.9029 9.10736L13.5216 9.69213ZM16.6421 15.0869C16.349 14.7943 15.8741 14.7947 15.5815 15.0879C15.2888 15.381 15.2893 15.8559 15.5824 16.1485L16.6421 15.0869ZM18.9704 19.5305C19.2636 19.8232 19.7384 19.8228 20.0311 19.5296C20.3237 19.2364 20.3233 18.7616 20.0301 18.4689L18.9704 19.5305ZM11.8283 8.69457C12.5508 8.61801 13.2384 9.02306 13.5216 9.69213L14.9029 9.10736C14.3622 7.83005 13.0496 7.05676 11.6702 7.20292L11.8283 8.69457ZM15.5824 16.1485L18.9704 19.5305L20.0301 18.4689L16.6421 15.0869L15.5824 16.1485Z" fill="#ffffff"></path> </g></svg>
    }
    else
        return (
            <svg fill="#000000" height="18" width="18" className="text-white/70" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" xmlSpace="preserve"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_28_" d="M244.7,101.5C218.1,66,175.8,42.9,128,42.9S37.9,66,11.3,101.5c-4.9,6.9-8,15.3-8,24.5s3.1,17.6,8,24.3 C37.9,185.9,80.2,209,128,209s90.1-23.1,116.7-58.7c4.9-6.9,8-15.3,8-24.5S249.6,108.5,244.7,101.5z M227.5,138.7 c-23.7,31.3-60.3,49.7-99.5,49.7c-39.4,0-75.8-18.4-99.5-49.7c-2.7-3.7-4.3-8.2-4.3-12.7c0-4.3,1.6-9,4.3-12.7 C52.2,82.1,88.6,63.7,128,63.7c39.2,0,75.8,18.4,99.5,49.7c1.8,2.5,4.3,7.2,4.3,12.7S229.4,136.1,227.5,138.7z M128,79.2 c-25.8,0-46.8,20.8-46.8,46.8s21.1,46.8,46.8,46.8s46.8-21.1,46.8-46.8S153.8,79.2,128,79.2z M144.6,119.9 c-5.7,0-10.4-4.7-10.4-10.4c0-5.7,4.7-10.4,10.4-10.4c5.7,0,10.4,4.7,10.4,10.4C155,115.2,150.3,119.9,144.6,119.9z"></path> </g></svg>
        );

}
export default Icon



