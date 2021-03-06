import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_SALE_DETAILS } from '../Api';
import useAxios from '../Hooks/useAxios';
import NavBar from '../Components/Products/NavBar';
import SellerProductRow from '../Components/Seller/SellerProductRow';
import formatDate from '../Utils/formatDate';

const prefix = 'seller_order_details__element-order-details-label-';

function SellerOrderDetails() {
  const [orderProducts, setOrderProducts] = React.useState([]);
  const [orderInfo, setOrderInfo] = React.useState({
    saleId: '',
    saleDate: '',
    status: '',
  });

  const [value, setTotalValue] = React.useState(0);

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { id } = useParams();
  const { request } = useAxios();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(async () => {
    const options = GET_SALE_DETAILS(id);
    const response = await request(options);

    if (response) {
      const { sale } = response.data.success;

      // Informacoes do vendedor e pedido
      setOrderInfo({
        saleId: sale.id,
        saleDate: sale.saleDate,
        status: sale.status,
      });

      // Array de produtos
      setOrderProducts(sale.products);

      // Seta valor total do pedido
      setTotalValue(sale.totalPrice);
    }
  }, [id, request]);

  return (
    <div>
      <NavBar user={ currentUser } />
      <div>
        <h2>Detalhes do pedido</h2>
        <div
          data-testid={ `${prefix}order-id` }
        >
          {`Pedido N. ${orderInfo.saleId}`}
        </div>
        <div
          data-testid={ `${prefix}order-date` }
        >
          {`Data: ${formatDate(orderInfo.saleDate)}`}
        </div>
        <div>
          Status:
          <span data-testid={ `${prefix}delivery-status` }>{`${orderInfo.status}`}</span>
        </div>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
        >
          Preparar pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          // No disabled abaixo ficara a logica responsavel por habilidar o botao quando necessario
          disabled
        >
          Saiu para entrega
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descricao</th>
            <th>Quantidade</th>
            <th>Preco unitario</th>
            <th>Sub-total</th>
          </tr>
          {
            orderProducts.map((product, i) => (
              <SellerProductRow key={ i } product={ product } index={ i } />
            ))
          }
        </thead>
      </table>
      <div>
        <p
          data-testid="seller_order_details__element-order-total-price"
        >
          {`${parseFloat(value).toFixed(2).replace(/\./, ',')}`}
        </p>
      </div>
    </div>
  );
}

export default SellerOrderDetails;
