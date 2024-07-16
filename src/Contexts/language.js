import { createContext, useContext, useState } from "react";

const translation = {
    eng:{
        Home:'Home',
        Project:'Project',
        Blog:'Blogs',
        Contact:'Contact',
        intro:['Hello,',
            "Hello, My name is Ayush Kaushik",
            "Hello, My name is Ayush Kaushik and I am a ..."],
        about:'About Me',
        aboutdesc: 'A cooperative team player and a proven leader with an experience in developing code effective, maintainable and scalable web applications.A technology geek with great enthusiasm to delve into new technologies and take up the challenge. A Javascript nerd and currently a React admirer',
        aboutbtn:'Explore',
        skill:'My skills',
        project:'My Projects',
        blogs:'My blogs',
        blogbtn:'See All',
        contact:'Contact Me',
        namePlace:'Enter your full name...',
        emailPlace:'Enter your email...',
        commentPlace:'Enter your comment..',
        contactbtn:'Send',
        follow:'Follow Me'
    },
    hnd:{

        Home:'घर',
        Project:'परियोजना',
        Blog:'ब्लॉग',
        Contact:'संपर्क',
        intro:['नमस्ते,',
            "नमस्ते, मेरा नाम आयुष कौशिक है",
            "नमस्ते, मेरा नाम आयुष कौशिक है और मैं हूं एक..."],
        about:'मेरे बारे में',
        aboutdesc: 'एक सहयोगी टीम के खिलाड़ी और कोड को प्रभावी, रखरखाव योग्य और स्केलेबल वेब एप्लिकेशन विकसित करने के अनुभव के साथ एक सिद्ध लीडर। नई प्रौद्योगिकियों में गहराई से जाने और चुनौती लेने के लिए बहुत उत्साह वाला एक प्रौद्योगिकी विशेषज्ञ। जावास्क्रिप्ट का शौकीन और वर्तमान में रिएक्ट का प्रशंसक',
        aboutbtn:'एक्सप्लोर',
        skill:'मेरा हुनर',
        project:'मेरे प्रोजेक्ट',
        blogs:'मेरे ब्लॉग',
        blogbtn:'सभी देखें',
        contact:'संपर्क करें',
        namePlace:'अपना पूरा नाम भरें...',
        emailPlace:'अपना ईमेल दर्ज करें...',
        commentPlace:'अपनी टिप्पणी दर्ज करें..',
        contactbtn:'भेजें',
        follow:'मुझे फॉलो करें'

    },
    deu:{
        Home:'Heim',
        Project:'Projekt',
        Blog:'Blogs',
        Contact:'Kontakt',
        intro:['Hallo,',
            "Hallo, mein Name ist Ayush Kaushik",
            "Hallo, mein Name ist Ayush Kaushik und ich bin ein ..."],
        about:'Über mich',
        aboutdesc: 'Ein kooperativer Teamplayer und bewährter Leiter mit Erfahrung in der Entwicklung von Code-effizienten, wartbaren und skalierbaren Webanwendungen. Ein Technikfreak mit großer Begeisterung, sich in neue Technologien zu vertiefen und die Herausforderung anzunehmen. Ein Javascript-Nerd und derzeit ein React-Fan.',
        aboutbtn:'Erkunden',
        skill:'Meine Fähigkeiten',
        project:'Meine Projekte',
        blogs:'Meine Blogs',
        blogbtn:'Alles sehen',
        contact:'Kontaktiere mich',
        namePlace:'Geben Sie Ihren vollständigen Namen ein...',
        emailPlace:'Geben sie ihre E-Mail Adresse ein...',
        commentPlace:'Geben Sie Ihren Kommentar ein..',
        contactbtn:'Senden',
        follow:'Folgen Sie mir'
    }
}

export const SUPPORTED_LANG = [
    {identifier:'eng', name: 'English'},
    {identifier:'hnd', name: 'Hindi'},
    {identifier:'deu', name: 'Deutsch'}
];

export const TranslateContext = createContext()

export const useTranslation = () => useContext(TranslateContext)

export const TranslateProvider = ({children}) => {
    const [lang,setLang] = useState('eng')

    const translate = (key) => translation[lang][key] || key

    return(
        <TranslateContext.Provider value={{lang,setLang,translation}}>
            {children}
        </TranslateContext.Provider>
    )
}

export default translation;