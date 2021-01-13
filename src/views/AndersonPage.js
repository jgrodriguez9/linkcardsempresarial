import React, { useEffect } from 'react';
import firebase from 'firebase/app'
import "firebase/firestore"
import { useParams } from 'react-router-dom';

export default function AndersonPage(){
    const firebaseDB = firebase.firestore();
    const { id } = useParams();
    console.log(id)

    useEffect(()=>{
        const trabajadorData = async () =>{
            const trabajadorDB = firebaseDB.collection("atrabajador")
            const trabajadorCollection = await trabajadorDB.where("tarjeta", '==', id).limit(1).get();            
            if(!trabajadorCollection.empty){
                trabajadorCollection.forEach(doc=>{
                    const d ={
                        fecha: new Date(),
                        empresa: doc.data().empresa,
                        puesto: doc.data().puesto,
                        nombre: `${doc.data().nombre} ${doc.data().apellidos}`,
                        tarjeta: doc.data().tarjeta,
                        ciudad: doc.data().ciudad,
                        correo: doc.data().correo,
                        celular: doc.data().celular,
                        cumpleanos: doc.data().cumpleanos
                    }                   
                    firebaseDB.collection("aestadisticas").add(d)
                    .then(response=>{
                        //console.log(response)
                        window.location.replace("https://concierge.grupoandersons.com/")
                    })
                    .catch(error=>{
                        //console.log(error)
                    })
                })                
            }else{
                //console.log("empty")
            }
        }
        trabajadorData();
    });

    return null;

}