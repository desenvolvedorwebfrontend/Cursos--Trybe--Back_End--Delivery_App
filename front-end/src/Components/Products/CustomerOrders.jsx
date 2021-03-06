import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { GET_ORDERS_BY_USER_ID } from '../../Api';
import useAxios from '../../Hooks/useAxios';
import formatDate from '../../Utils/formatDate';

const CustomerOrders = ({ userId }) => {
  const navigate = useNavigate();
  const { request } = useAxios();
  const [orders, setOrders] = React.useState([]);

  // O maldito do axios nao permite mandar um body em requisicoes get
  // Source: https://github.com/axios/axios
  React.useEffect(async () => {
    const options = GET_ORDERS_BY_USER_ID(userId);
    // eslint-disable-next-line no-unused-vars
    const result = await request(options);
    setOrders(result.data.success.orders);
    console.log(result.data.success.orders);
  }, []);

  function goToOrder(orderId) {
    navigate(`/customer/orders/${orderId}`);
  }

  return (
    <section>
      {orders.map((item, i) => (
        <div
          tabIndex={ 0 }
          role="button"
          key={ i }
          onClick={ () => goToOrder(item.id) }
          onKeyPress={ () => goToOrder(item.id) }
        >
          <div>
            <strong>Pedido</strong>
            <p data-testid={ `customer_orders__element-order-id-${item.id}` }>
              {`${item.id}`}
            </p>
          </div>
          <div data-testid={ `customer_orders__element-delivery-status-${item.id}` }>
            {item.status}
          </div>
          <div>
            <span data-testid={ `customer_orders__element-order-date-${item.id}` }>
              {formatDate(item.saleDate)}
            </span>
            <span
              data-testid={ `customer_orders__element-card-price-${item.id}` }
            >
              {item.totalPrice.replace(/\./, ',')}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CustomerOrders;

CustomerOrders.propTypes = {
  userId: PropTypes.number.isRequired,
};
