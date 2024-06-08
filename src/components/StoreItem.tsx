import { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

type StoreItemProps = {
  name: string;
  price: number;
  image: string;
  id: number;
  amount: number;
  maxQuantity: number;
};

export function StoreItem({ name, price, image, id, amount, maxQuantity }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    updateProductAmount,
    getItemInfo,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  const [showModal, setShowModal] = useState(false);
  const [itemInfo, setItemInfo] = useState<Item | null>(null);

  const handleShow = async () => {
    const info = await getItemInfo(id);
    setItemInfo(info);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={image} height="200px" style={{ objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button
              className="w-100"
              variant="warning"
              onClick={() => increaseCart(id, amount, maxQuantity)}
            >
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: '.5rem' }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: '.5rem' }}
              >
                <Button variant="danger"  onClick={() => decreaseCartQuantity(id)}>
                  -1
                </Button>
                <div>
                  <span className="fs-4">{quantity} </span> in cart
                </div>

                <Button
                  variant="success" 
                  onClick={() => increaseCart(id, amount, maxQuantity)}
                >
                  +1
                </Button>
              </div>
              <div>
                <span className="fs-5">
                  {' '}
                  {amount} {name} left in the store{' '}
                </span>
                <Button onClick={handleShow} variant="dark" size="sm">
                  Info
                </Button>
              </div>
              <Button
                className="w-100"
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>

      {/* Modal for displaying item information */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{itemInfo?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Description: {itemInfo?.description}</p>
          <p><img variant="top" height="300px" style={{ objectFit: 'cover' }} src={itemInfo?.image} alt={itemInfo?.name} /></p>
          <p>Category: {itemInfo?.category} </p>
          <p>{itemInfo?.description}</p>
          <p>Price: {itemInfo?.price}</p>
          <p>Amount: {itemInfo?.amount}</p>
          <p>Max Quantity: {itemInfo?.maxQuantity}</p>
          <p>Id: {itemInfo?.id}</p>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );

  function increaseCart(id: number, amount: number, maxQuantity: number) {
    const currentQuantity = getItemQuantity(id);

    if (currentQuantity < maxQuantity) {
      increaseCartQuantity(id);
      const quantityToAdd = Math.min(amount - currentQuantity, maxQuantity - currentQuantity);
      updateProductAmount(id, quantityToAdd);
    } else {
      console.warn(`Cannot add more ${name} to the cart. Maximum quantity reached.`);
    }
  }
}
