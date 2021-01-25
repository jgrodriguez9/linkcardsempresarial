import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import "firebase/firestore"
import { useParams } from 'react-router-dom';
import LoaderRequest from '../loader/LoaderRequest';
import PresentationDesktop from '../components/PresentationDesktop';
import { openTab } from '../utils/openTab';
import PresentationMovil from '../components/PresentationMovil';
import VCard from 'vcard-creator'
import { getUrl } from '../utils/getUrl';

export default function PresentationCard(){
    const mql = window.matchMedia('(max-width: 540px)');
    const [isSubmiting, setSubmiting] = useState(true)
    const firebaseDB = firebase.firestore();
    const { id } = useParams();
    const [item, setItem] = useState(null)
    const [cliente, setCliente] = useState(null)
    console.log(id)


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
                    firebaseDB.collection("lke_empresa").where("nombre", '==', doc.data().cliente).limit(1).get()
                    .then(r=>{
                        if(!r.empty){
                            r.forEach(i=>{
                                setCliente(i.data())
                            })

                            //new estaditicas
                            firebaseDB.collection("lke_estadisticas").add(d)
                            .then(response=>{
                                setSubmiting(false)
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
        setSubmiting(true)
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
                setSubmiting(false)
                openTab(description, type, mql.matches)
            })
            
        })
    }
    
    const CreateVCard = () => {
        const vCard = new VCard()
        var lastname = item.name
        vCard.addName(lastname)
        //vCard.addPhoto('https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black.png') 
        // add work data
        vCard.addCompany(item.cliente)
        vCard.addJobtitle(item.puesto)
        //vCard.addRole('Data Protection Officer')
        //vCard.addEmail('info@jeroendesloovere.be')

        var phone = cliente.social_list.filter(item=>item.icon==='phone')
        vCard.addPhoneNumber(phone.length > 0 && phone[0].description, 'PREF;WORK')
        //vCard.addPhoneNumber(123456789, 'WORK')

        //var dir = item.social_list.filter(item=>item.icon==='ciudad')
        vCard.addAddress('', '', item.ciudad, item.pais, '', '', '')

        cliente.social_list.forEach(element => {
            if(element.icon !=='phone' && element.description!==""){
                vCard.addURL(getUrl(element.description, element.icon))
            }
        });

        //console.log(vCard.toString())
        const FileSaver = require('file-saver'); 
        const blob = new Blob([ vCard.toString() ], {type: "text/x-vCard;charset=utf-8"});
        FileSaver.saveAs(blob, `${item.name}.vcf`);
    };
   
    return (
        <>
            { isSubmiting ? LoaderRequest()  : 
                mql.matches ?
                <PresentationMovil 
                    item={item} 
                    cliente={cliente} 
                    handleClickSocial={handleClickSocial}
                    CreateVCard={CreateVCard}
                /> :
                <PresentationDesktop 
                    item={item} 
                    cliente={cliente} 
                    handleClickSocial={handleClickSocial}
                    CreateVCard={CreateVCard}
                />
            }

            
        </>
    );

}