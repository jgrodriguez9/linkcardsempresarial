import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import "firebase/firestore"
import { useParams } from 'react-router-dom';
import PresentationDesktop from '../components/PresentationDesktop';
import { openTab } from '../utils/openTab';
import PresentationMovil from '../components/PresentationMovil';
import VCard from 'vcard-creator'
import { getUrl } from '../utils/getUrl';
import { LoaderFrontend } from '../loader/LoaderFrontend';
import {isChrome,isIOS} from 'react-device-detect';

export default function PresentationCard(){
    const mql = window.matchMedia('(max-width: 540px)');
    const [isSubmiting, setSubmiting] = useState(true)
    const firebaseDB = firebase.firestore();
    const { id } = useParams();
    const [item, setItem] = useState(null)
    const [cliente, setCliente] = useState(null)
    const [urlFile, setUrlFile] = useState(null)
    const storage = firebase.storage()


    useEffect(()=>{
        setSubmiting(true)
        const trabajadorData = async () =>{
            const trabajadorDB = firebaseDB.collection("lke_trabajador")
            const trabajadorCollection = await trabajadorDB.where("tarjeta", '==', id).limit(1).get();         
            if(!trabajadorCollection.empty){
                trabajadorCollection.forEach(doc=>{
                    let visitas = doc.data().visitas
                    visitas++
                    doc.ref.update({
                        visitas: visitas
                    })
                    const d ={
                        fecha: new Date(),
                        empresa: doc.data().empresa,
                        puesto: doc.data().puesto,
                        nombre: `${doc.data().nombre} ${doc.data().apellidos}`,
                        tarjeta: doc.data().tarjeta,
                        ciudad: doc.data().ciudad,
                        email: doc.data().email,
                        celular: doc.data().celular,
                        cumpleanos: doc.data().cumpleanos,
                        direccion: doc.data().direccion,
                        cliente: doc.data().cliente,
                        pais: doc.data().pais,
                    }    
                    setItem(doc.data())
                    //buscamos al cliente al cual pertenece
                    const fRefP = firebaseDB.collection("lke_empresa").doc(doc.data().cliente)
                    fRefP.get()
                    .then(r=>{
                        if(r.exists){
                            setCliente(r.data())
                            //new estaditicas
                            firebaseDB.collection("lke_estadisticas").add(d)
                            .then(response=>{
                                //test
                                const nameKey = `${d.nombre.replaceAll(/\s/g,'')}${d.cliente}${d.tarjeta}.vcf`
                                storage.ref('linkcardempresarialcard').child(nameKey).delete()
                                .then(response=>{
                                    console.log(response)
                                    CreateVCard(d, r.data(), nameKey)
                                    setSubmiting(false)
                                })
                                .catch(error=>{
                                    //console.log('error')
                                    //console.log(error)
                                    //como no existe se crea uno nuevo y se guarda
                                    CreateVCard(d, r.data(), nameKey)
                                    setSubmiting(false)
                                })
                                //end test                                
                                //console.log(response)                        
                            })
                            .catch(error=>{
                                //console.log(error)
                            })
                        }                        
                    }).catch(error=>{
                        //console.log(error)
                    })
                })      
                
               
                

            }else{
                //console.log("empty")
            }
        }
        trabajadorData();
    },[]);

    const  handleClickSocial = (type, description)=>{
        //setSubmiting(true)
        if(type==='cel' || type==='mail'){
            //setSubmiting(false)
            openTab(description, type, mql.matches)
        }else{
            openTab(description, type, mql.matches)
            firebaseDB.collection('lke_trabajador').where("tarjeta", '==', id).limit(1).get()
            .then(response=>{
                response.forEach(elemento=>{
                    let social = elemento.data().social_list
                    const index = social.findIndex(item => item.icon === type)
                    if(index >= 0){
                        social[index].click = social[index].click+1
                        social[index].description = description
                        elemento.ref.update({
                            social_list: social
                        })
                    }else{
                        let obj = {
                            click: 1,
                            icon: type,
                            description: description
                        }
                        social.push(obj)
                        elemento.ref.update({
                            social_list: social
                        })
                    }
                    //setSubmiting(false)
                    
                })            
            })
        }
        
    }
    
    const CreateVCard = (it, cli, nameKey) => {
            console.log(it)
            console.log(cli)
            console.log(nameKey)
            const vCard = new VCard()
            let lastname = `${it.nombre}`
            vCard.addName(lastname)
            //vCard.addPhoto('https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black.png') 
            // add work data
            vCard.addCompany(it.cliente)
            vCard.addJobtitle(it.puesto)
            //vCard.addRole('Data Protection Officer')
            //vCard.addEmail('info@jeroendesloovere.be')
    
            if(it.celular && it.celular !== ""){
                vCard.addPhoneNumber(it.celular, 'PREF;WORK')
            }
            
            //vCard.addPhoneNumber(123456789, 'WORK')
    
            //var dir = it.social_list.filter(it=>it.icon==='ciudad')
            vCard.addAddress('', '', it.ciudad, it.pais, '', '', '')
    
            cli.social_list.filter(it=>it.description!=="").forEach(element => {
                if(element.icon !=='phone' && element.description!==""){
                    vCard.addURL(getUrl(element.description, element.icon))
                }
            });
    
            //console.log(vCard.toString())
            const blob = new Blob([ vCard.toString() ], {type: "text/vCard;charset=utf-8"});
            const uploadTask = storage.ref(`/linkcardempresarialcard/${nameKey}`).put(blob)
            uploadTask.on("state_changed", console.log, console.error, () => {
                storage
                .ref("linkcardempresarialcard")
                .child(nameKey)
                .getDownloadURL()
                .then((url) => {
                       setUrlFile(url)                                           
                });
            });
           
    };


   
    return (
        <>
            { isSubmiting ? LoaderFrontend()  : 
                mql.matches ?
                <PresentationMovil 
                    item={item} 
                    cliente={cliente} 
                    handleClickSocial={handleClickSocial}
                    urlFile={urlFile}
                /> :
                <PresentationDesktop 
                    item={item} 
                    cliente={cliente} 
                    handleClickSocial={handleClickSocial}
                    urlFile={urlFile}
                />
            }

            
        </>
    );

}