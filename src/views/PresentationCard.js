import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app'
import "firebase/firestore"
import { useParams } from 'react-router-dom';
import LoaderRequest from '../loader/LoaderRequest';
import PresentationDesktop from '../components/PresentationDesktop';

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
                            setSubmiting(false)
                        }
                        
                    })
                    

                           
                    // firebaseDB.collection("lke_estadisticas").add(d)
                    // .then(response=>{
                    //     setSubmiting(false)
                    //     //console.log(response)                        
                    // })
                    // .catch(error=>{
                    //     //console.log(error)
                    // })
                })                
            }else{
                //console.log("empty")
            }
        }
        trabajadorData();
    },[]);

    return (
        <>
            { isSubmiting ? LoaderRequest()  : <PresentationDesktop item={item} cliente={cliente}/>}

            
        </>
    );

}