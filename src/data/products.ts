export type Category='Tous'|'Homme'|'Femme'|'Accessoires'
export type Product={id:number;name:string;category:Exclude<Category,'Tous'>;price:number;image:string;description:string}
export const products:Product[]=[
{id:1,name:'Ensemble Noir Signature',category:'Femme',price:28500,image:'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=85',description:'Silhouette élégante et coupe moderne.'},
{id:2,name:'Chemise Premium',category:'Homme',price:19500,image:'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85',description:'Chemise polyvalente pour un style propre.'},
{id:3,name:'Veste Urban',category:'Homme',price:42000,image:'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85',description:'Veste structurée pour les sorties et occasions.'},
{id:4,name:'Robe Minimal',category:'Femme',price:32000,image:'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=85',description:'Une pièce minimaliste et intemporelle.'},
{id:5,name:'Sac Studio',category:'Accessoires',price:17500,image:'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',description:'Format pratique avec finition premium.'},
{id:6,name:'Sneakers Essential',category:'Accessoires',price:35000,image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',description:'Confort quotidien et look contemporain.'}]
export const formatPrice=(price:number)=>new Intl.NumberFormat('fr-SN').format(price)+' FCFA'