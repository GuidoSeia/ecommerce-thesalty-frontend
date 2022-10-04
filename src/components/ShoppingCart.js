import React from 'react'


const ShoppingCart = () => {


  return (
<div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-black shadow" onClick={onclick} >

<div className="card-body"  >
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                            <button className="bG-color btn btn-block">View cart</button>
                        </div>
                    </div>
                  
</div>
  )
}

export default ShoppingCart