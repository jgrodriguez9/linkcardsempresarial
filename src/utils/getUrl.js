import { React } from "react";

export const getUrl = (profile, icon) => {
    switch(icon){
        case 'site':
            return `https://www.${profile}`
        case 'whatsapp':
            return `https://api.whatsapp.com/send?phone=+521${profile.replace(/\s/g, '')}`
        // case 'location':
        //     return `https://maps.google.com/maps?q=${profile}`
        case 'facebook':
            return `https://www.facebook.com/${profile}` 
        case 'twitter':
            return `https://www.twitter.com/${profile}`
        case 'instagram':
            return `https://www.instagram.com/${profile}`
        case 'youtube':
            return `https://www.youtube.com/user/${profile}`
        case 'tiktok':
            return `https://www.tiktok.com/${profile}`
        case 'linkedin':
            return `https://www.linkedin.com/${profile}`
        case 'phone':
            return profile
        case 'mail':
            return `mailto:${profile}`
        case 'skype':
            return `https://www.skype.com/${profile}`
        case 'pinterest':
            return `https://www.pinterest.com/${profile}`
        case 'telegram':
            return `https://www.telegram.com/${profile}`
        case 'soundcloud':
            return `https://www.soundcloud.com/${profile}`
        case 'flickr':
            return `https://www.flickr.com/${profile}`
        case 'tripadvisor':
            return `https://www.tripadvisor.com/${profile}`
        case 'behance':
            return `https://www.behance.com/${profile}`
        case 'vimeo':
            return `https://www.vimeo.com/${profile}`
        case 'googleplus':
            return `https://www.plus.google.com/${profile}`
        case 'spotify':
            return `https://www.spotify.com/${profile}`
        default:
            return ''
    }
}