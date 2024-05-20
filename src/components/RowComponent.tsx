import React from 'react';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { Component } from "../lib/domain/Models/Inventary/Component";
import { TreeComponent } from '../lib/domain/Models/Inventary/TreeComponent';

interface props{
    IdComponentsDetails: string[];
    Components: Component[];
    ComponentsDetail: TreeComponent[];
}
function RowComponent({
    IdComponentsDetails,
    Components,
    ComponentsDetail,
}:props) {
    return (
        <>
        {
             IdComponentsDetails?.map(compDetail => {
                const componentName = Components?.find(c => c.IdComponent === compDetail);
                const parentData = ComponentsDetail?.find(cd => cd.IdParent === compDetail);
                const IdComponentChildren = ComponentsDetail?.filter(cd => cd.IdParent === compDetail);
            
                return (
                  <tr key={compDetail}>
                    <td><MdOutlineCheckBoxOutlineBlank/></td>
                    <td>{componentName?.Name}</td>
                    <td>{parentData?.Quantity}</td>
                    {
                      IdComponentChildren?.map(compChild => {
                        const childrenData = Components?.find(cd => cd.IdComponent === compChild.IdComponent);
                        return(
                          <tr key={compChild.IdComponent}>
                            <td><MdOutlineCheckBoxOutlineBlank/></td>
                            <td>{childrenData?.Name}</td> 
                            <td>{compChild.Quantity}</td> 
                          </tr>
                        );
                      })
                    }
                  </tr>

                );
              })
        }
        </>
    );
}

export default RowComponent;