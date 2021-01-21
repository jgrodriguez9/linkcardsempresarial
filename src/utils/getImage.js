import React from 'react';
import phone from '../images/social/phone.svg'
import watsaap from '../images/social/watsaap.svg'
import site from '../images/social/site.svg'
import facebook from '../images/social/facebook.svg'
import twitter from '../images/social/twitter.svg'
import instagram from '../images/social/instagram.svg'
import tiktok from '../images/social/tiktok.svg'
import pinterest from '../images/social/pinterest.svg'
import youtube from '../images/social/youtube.svg'
import telegram from '../images/social/telegram.svg'
import sky from '../images/social/sky.svg'
import flickr from '../images/social/flickr.svg'
import soundcloud from '../images/social/soundcloud.svg'
import spotify from '../images/social/spotify.svg'
import tripadvisor from '../images/social/tripadvisor.svg'
import linkedin from '../images/social/linkedin.svg'
import behance from '../images/social/behance.svg'
import mail from '../images/social/mail.svg'


export const getImage = (icon)=>{
    switch(icon){
        case 'site':
            return site
        case 'whatsapp':
            return watsaap
        case 'location':
            return ''
        case 'facebook':
            return facebook
        case 'twitter':
            return twitter
        case 'instagram':
            return instagram
        case 'youtube':
            return youtube
        case 'tiktok':
            return tiktok        
        case 'linkedin':
            return linkedin
        case 'phone':
            return phone;
        case 'mail':
            return mail
        case 'skype':
            return sky
        case 'pinterest':
            return pinterest
        case 'telegram':
            return telegram
        case 'soundcloud':
            return soundcloud
        case 'flickr':
            return flickr
        case 'tripadvisor':
            return tripadvisor
        case 'behance':
            return behance
        case 'vimeo':
            return ''
        case 'googleplus':
            return ''
        case 'spotify':
            return spotify
        default:
            return ''
    }
}