import React from 'react';

export const getNombreRS = icon =>{
    switch(icon){
        case 'site':
            return "Página web"
        case 'whatsapp':
            return "Whatsapp"
        case 'location':
            return "Dirección"
        case 'facebook':
            return "Facebook"
        case 'twitter':
            return "Twitter"
        case 'instagram':
            return "Instagram"
        case 'youtube':
            return "Youtube"
        case 'tiktok':
            return "TikTok"        
        case 'linkedin':
            return "LinkedIn"
        case 'phone':
            return "Teléfono"
        case 'mail':
            return "Correo electrónico"
        case 'skype':
            return "Skype"
        case 'pinterest':
            return "Pinterest"
        case 'telegram':
            return "Telegram"
        case 'soundcloud':
            return "SoundCloud"
        case 'flickr':
            return "Flickr"
        case 'tripadvisor':
            return "Tripadvisor"
        case 'behance':
            return "Behance"
        case 'vimeo':
            return "Vimeo"
        case 'googleplus':
            return "GooglePlus"
        case 'spotify':
            return "Spotify"
        default:
            return ""
    }
}