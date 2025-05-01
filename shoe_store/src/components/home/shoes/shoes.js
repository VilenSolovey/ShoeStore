import React, { useContext, useState } from 'react';
import { ItemsContext } from '../../../context/itemscontext'; 
import ViewMoreButton from '../viewButton/viewButton'; 
import CatalogItem from '../../catalog/catalogItem/catalogItem';
import './shoes.css';

const NewArrivals = () => {
    const { items } = useContext(ItemsContext);
    const [visibleItems, setVisibleItems] = useState(6);

    const handleViewMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 6); 
    };

    return (
        <section className="new-arrivals">
            <h2 className="new-arrivals-title">Новинки Сезону</h2>
            <div className="shoes-grid">
                {items.slice(0, visibleItems).map((shoe) => ( 
                    <CatalogItem
                        key={shoe.id}
                        id={shoe.id}
                        title={shoe.title}
                        price={shoe.price}
                        description={shoe.description}
                        imageUrl={shoe.imageUrl}
                        size={shoe.size}
                    />
                ))}
            </div>
            {visibleItems < items.length && ( 
                <ViewMoreButton onClick={handleViewMore} /> 
            )}
        </section>
    );
};

export default NewArrivals;
