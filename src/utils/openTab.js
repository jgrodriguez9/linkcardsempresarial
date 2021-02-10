import React from 'react';
import {isAndroid} from 'react-device-detect';


export const openTab = (profile, type, mobile) => { 
    switch(type){
        case 'site':
            window.open(`https://www.${profile}`, '_blank')
            break;
        case 'whatsapp':
            window.open(`https://api.whatsapp.com/send?phone=+521${profile}`, '_blank')
            break;
        case 'location':
            window.open(`https://maps.google.com/maps?q=${profile}`, '_blank')
            break;
        case 'facebook':
            if(mobile){
                if(isAndroid){
                    window.open(`fb://faceweb/f?href=${encodeURI(`https://www.facebook.com/${profile}`)}`, '_blank')
                }else{
                    window.open(`fb://profile?id=${profile}`, '_blank')
                }               
            }else{
                window.open(`https://www.facebook.com/${profile}`, '_blank')
            }            
            break;
        case 'twitter':
            window.open(`https://www.twitter.com/${profile}`, '_blank')
            break;
        case 'instagram':
            window.open(`https://www.instagram.com/${profile}`, '_blank')
            break;
        case 'youtube':
            window.open(`https://www.youtube.com/${profile}`, '_blank')
            break;
        case 'tiktok':
            window.open(`https://www.tiktok.com/${profile}`, '_blank')
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/${profile}`, '_blank')
            break;
        case 'phone':
            window.open(`tel:${profile}`, '_blank')
            break;
        case 'mail':
            window.open(`mailto:${profile}`, '_blank')
            break;
        case 'skype':
            window.open(`https://www.skype.com/${profile}`, '_blank')
            break;
        case 'pinterest':
            window.open(`https://www.pinterest.com/${profile}`, '_blank')
            break;
        case 'telegram':
            window.open(`https://www.telegram.com/${profile}`, '_blank')
            break;
        case 'soundcloud':
            window.open(`https://www.soundcloud.com/${profile}`, '_blank')
            break;
        case 'flickr':
            window.open(`https://www.flickr.com/${profile}`, '_blank')
            break;
        case 'tripadvisor':
            window.open(`https://www.tripadvisor.com/${profile}`, '_blank')
            break;
        case 'behance':
            window.open(`https://www.behance.com/${profile}`, '_blank')
            break;
        case 'vimeo':
            window.open(`https://www.vimeo.com/${profile}`, '_blank')
            break;
        case 'googleplus':
            window.open(`https://www.plus.google.com/${profile}`, '_blank')
            break;
        case 'spotify':
            window.open(`https://www.spotify.com/${profile}`, '_blank')
            break;
        default:
            window.open(profile, '_blank')
            break;
    }
}