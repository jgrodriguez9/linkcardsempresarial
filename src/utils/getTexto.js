import React from 'react';

export const getTexto = (icon) =>{
    switch(icon){
        case 'site':
            return 'Página web'
        case 'whatsapp':
            return 'Whatsapp'
        case 'location':
            return ''
        case 'facebook':
            return 'Facebook'
        case 'twitter':
            return 'Twitter'
        case 'instagram':
            return 'Instagram'
        case 'youtube':
            return 'Youtube'
        case 'tiktok':
            return 'Tiktok'        
        case 'linkedin':
            return 'Linkedin'
        case 'phone':
            return 'Teléfono';
        case 'mail':
            return 'Correo elextrónico'
        case 'skype':
            return 'Skype'
        case 'pinterest':
            return 'Pinterest'
        case 'telegram':
            return 'Telegram'
        case 'soundcloud':
            return 'Soundcloud'
        case 'flickr':
            return 'Flickr'
        case 'tripadvisor':
            return 'Tripadvisor'
        case 'behance':
            return 'Behance'
        case 'vimeo':
            return ''
        case 'googleplus':
            return ''
        case 'spotify':
            return 'Spotify'
        default:
            return ''
    }
}