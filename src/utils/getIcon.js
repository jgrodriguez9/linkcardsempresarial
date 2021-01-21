import React from 'react';
import { FaBehance, FaEnvelope, FaFacebookF, FaFlickr, FaGooglePlusG, FaInstagram, FaLaptop, FaLink, FaLinkedin, FaMapMarkerAlt, FaPhoneAlt, FaPinterest, FaSkype, FaSpotify, FaTelegram, FaTripadvisor, FaTwitter, FaVimeoV, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from "react-icons/si";
import { GrSoundcloud } from "react-icons/gr";

export const getIcon = (icon, clase) =>{
    switch(icon){
        case 'site':
            return <FaLaptop className={clase} />
        case 'whatsapp':
            return <FaWhatsapp className={clase} />
        case 'location':
            return <FaMapMarkerAlt className={clase} />
        case 'facebook':
            return <FaFacebookF className={clase} />
        case 'twitter':
            return <FaTwitter className={clase} />
        case 'instagram':
            return <FaInstagram className={clase} />
        case 'youtube':
            return <FaYoutube className={clase} />
        case 'tiktok':
            return <SiTiktok className={clase} />        
        case 'linkedin':
            return <FaLinkedin className={clase} />
        case 'phone':
            return <FaPhoneAlt className={clase} />
        case 'mail':
            return <FaEnvelope className={clase} />
        case 'skype':
            return <FaSkype className={clase} />
        case 'pinterest':
            return <FaPinterest className={clase} />
        case 'telegram':
            return <FaTelegram className={clase} />
        case 'soundcloud':
            return <GrSoundcloud className={clase} />
        case 'flickr':
            return <FaFlickr className={clase} />
        case 'tripadvisor':
            return <FaTripadvisor className={clase} />
        case 'behance':
            return <FaBehance className={clase} />
        case 'vimeo':
            return <FaVimeoV className={clase} />
        case 'googleplus':
            return <FaGooglePlusG className={clase} />
        case 'spotify':
            return <FaSpotify className={clase} />
        default:
            return <FaLink className={clase}/>
    }
}