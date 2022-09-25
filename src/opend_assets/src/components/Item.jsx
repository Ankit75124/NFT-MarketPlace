import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {Actor, HttpAgent } from "@dfinity/agent";
import {idlFactory} from "../../../declarations/nft";
import {Principal} from "@dfinity/principal";


function Item(props) {

  const [name,setName]= useState();
  const [owner,setOwner]= useState();

  const id=Principal.fromText(props.id);

  const localHost = "http://localhost:8080/";
  const agent =new HttpAgent({host: localHost});

  async function LoadNFT(){
    const NFTActor= await Actor.createActor(idlFactory, {
      agent,
      canisterId:id,
    });
    const name = await NFTActor.getName();
    console.log(name);
    const owner = await NFTActor.getOwner();
    setName(name);
    setOwner(owner);
  }
  
  useEffect(() =>{
    
    LoadNFT();
  },[]);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={logo}
        />
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            Cryptopunk :{name}<span className="purple-text"></span>
          </h2>
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
