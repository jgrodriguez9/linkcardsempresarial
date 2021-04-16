import React from 'react';
import {isAndroid} from 'react-device-detect';


export const openTab = (profile, type, mobile) => { 
    switch(type){
        case 'site':
            window.open(`${profile}`, '_self')
            break;
        case 'whatsapp':
            window.open(`https://api.whatsapp.com/send?phone=${profile.replace(/\s/g, '')}`, '_self')
            break;
        case 'location':
            window.open(`${profile}`, '_self')
            break;
        case 'facebook':
            if(mobile){
                if(isAndroid){
                    window.open(`fb://faceweb/f?href=${encodeURI(`${profile}`)}`, '_self')
                }else{
                    window.open(`fb://profile?id=${profile}`, '_self')
                }               
            }else{
                window.open(`${profile}`, '_self')
            }            
            break;
        case 'twitter':
            window.open(`${profile}`, '_self')
            break;
        case 'instagram':
            window.open(`${profile}`, '_self')
            break;
        case 'youtube':
            window.open(`${profile}`, '_self')
            break;
        case 'tiktok':
            window.open(`${profile}`, '_self')
            break;
        case 'linkedin':
            window.open(`${profile}`, '_self')
            break;
        case 'phone':
            window.open(`tel:${profile}`, '_self')
            break;
        case 'cel':
            window.open(`tel:${profile}`, '_self')
            break;
        case 'mail':
            window.open(`mailto:${profile}`, '_self')
            break;
        case 'skype':
            window.open(`${profile}`, '_self')
            break;
        case 'pinterest':
            window.open(`${profile}`, '_self')
            break;
        case 'telegram':
            window.open(`${profile}`, '_self')
            break;
        case 'soundcloud':
            window.open(`${profile}`, '_self')
            break;
        case 'flickr':
            window.open(`${profile}`, '_self')
            break;
        case 'tripadvisor':
            window.open(`${profile}`, '_self')
            break;
        case 'behance':
            window.open(`${profile}`, '_self')
            break;
        case 'vimeo':
            window.open(`${profile}`, '_self')
            break;
        case 'googleplus':
            window.open(`${profile}`, '_self')
            break;
        case 'spotify':
            window.open(`${profile}`, '_self')
            break;
        default:
            window.open(profile, '_self')
            break;
    }
}