const Icon = ({ kind }) => {

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
            <svg fill="#000000" height="18" width="18" viewBox="0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:serif="http://www.serif.com/" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.112,18.784l-2.153,2.156c-0.585,0.586 -0.585,1.536 0.001,2.121c0.586,0.585 1.536,0.585 2.121,-0.001l2.666,-2.668c1.898,0.983 4.19,1.806 6.773,2.041l0,3.567c0,0.828 0.672,1.5 1.5,1.5c0.828,-0 1.5,-0.672 1.5,-1.5l0,-3.571c2.147,-0.201 4.091,-0.806 5.774,-1.571l3.199,3.202c0.585,0.586 1.535,0.586 2.121,0.001c0.586,-0.585 0.586,-1.535 0.001,-2.121l-2.579,-2.581c2.59,-1.665 4.091,-3.369 4.091,-3.369c0.546,-0.622 0.485,-1.57 -0.137,-2.117c-0.622,-0.546 -1.57,-0.485 -2.117,0.137c0,-0 -4.814,5.49 -11.873,5.49c-7.059,0 -11.873,-5.49 -11.873,-5.49c-0.547,-0.622 -1.495,-0.683 -2.117,-0.137c-0.622,0.547 -0.683,1.495 -0.137,2.117c0,0 1.175,1.334 3.239,2.794Z"></path><g id="Icon"></g></g></svg>
        )
    } else
        return (
            <svg fill="#000000" height="18" width="18" className="text-white/70" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_28_" d="M244.7,101.5C218.1,66,175.8,42.9,128,42.9S37.9,66,11.3,101.5c-4.9,6.9-8,15.3-8,24.5s3.1,17.6,8,24.3 C37.9,185.9,80.2,209,128,209s90.1-23.1,116.7-58.7c4.9-6.9,8-15.3,8-24.5S249.6,108.5,244.7,101.5z M227.5,138.7 c-23.7,31.3-60.3,49.7-99.5,49.7c-39.4,0-75.8-18.4-99.5-49.7c-2.7-3.7-4.3-8.2-4.3-12.7c0-4.3,1.6-9,4.3-12.7 C52.2,82.1,88.6,63.7,128,63.7c39.2,0,75.8,18.4,99.5,49.7c1.8,2.5,4.3,7.2,4.3,12.7S229.4,136.1,227.5,138.7z M128,79.2 c-25.8,0-46.8,20.8-46.8,46.8s21.1,46.8,46.8,46.8s46.8-21.1,46.8-46.8S153.8,79.2,128,79.2z M144.6,119.9 c-5.7,0-10.4-4.7-10.4-10.4c0-5.7,4.7-10.4,10.4-10.4c5.7,0,10.4,4.7,10.4,10.4C155,115.2,150.3,119.9,144.6,119.9z"></path> </g></svg>
        );

}
export default Icon



