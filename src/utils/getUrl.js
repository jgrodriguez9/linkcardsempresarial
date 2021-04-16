import { React } from "react";

export const getUrl = (profile, icon) => {
    switch(icon){
        case 'site':
            return `${profile}`
        case 'whatsapp':
            return `https://api.whatsapp.com/send?phone=${profile.replace(/\s/g, '')}`
        // case 'location':
        //     return `https://maps.google.com/maps?q=${profile}`
        case 'facebook':
            return `${profile}` 
        case 'twitter':
            return `${profile}`
        case 'instagram':
            return `${profile}`
        case 'youtube':
            return `${profile}`
        case 'tiktok':
            return `${profile}`
        case 'linkedin':
            return `${profile}`
        case 'phone':
            return `tel:${profile}`
        case 'mail':
            return `mailto:${profile}`
        case 'skype':
            return `${profile}`
        case 'pinterest':
            return `${profile}`
        case 'telegram':
            return `${profile}`
        case 'soundcloud':
            return `${profile}`
        case 'flickr':
            return `${profile}`
        case 'tripadvisor':
            return `${profile}`
        case 'behance':
            return `${profile}`
        case 'vimeo':
            return `${profile}`
        case 'googleplus':
            return `${profile}`
        case 'spotify':
            return `${profile}`
        default:
            return ''
    }
}