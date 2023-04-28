import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import {fetchDisplayOrder} from '../store/actions/ordersActions';
import {Document, Font, Page, pdf, StyleSheet, Text, View,} from '@react-pdf/renderer';
import {saveAs} from 'file-saver';

const OrderCheckout = () => {
  const order = useSelector((state) => state.orders.displayOrder);
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log(order);

  useEffect(() => {
    if (!order) {
      dispatch(fetchDisplayOrder(id));
    }
  }, [id]);

  console.log(order);

  Font.register({
    family: 'Open Sans',
    src: 'https://fonts.gstatic.com/s/opensans/v23/mem8YaGs126MiZpBA-U1Ug.ttf',
    unicodeRange:
      'U+000-5FF,U+610-62F,U+1F00-1FFF,U+2000-206F,U+20A0-20CF,U+2100-214F,U+2E00-2E7F,U+A700-A71F',
  });

  const styles = StyleSheet.create({
    section: {
      margin: 20,
      fontFamily: 'Open Sans',
    },
    heading: {
      fontSize: 13,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
      fontFamily: 'Open Sans',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 20,
      marginBottom: 5,
      fontFamily: 'Open Sans',
    },
    label: {
      display: 'inline-block',
      width: 200,
      fontSize: 9,
    },
    text: {
      fontFamily: 'Open Sans',
      fontSize: 9,
    },
    table: {
      width: '90%',
      fontFamily: 'Open Sans',
      fontSize: 9,
      margin: '0 auto',
    },
    arow: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      borderTop: '1px solid #EEE',
      paddingTop: 8,
      paddingBottom: 8,
      fontFamily: 'Open Sans',
    },
    header: {
      borderTop: 'none',
      fontFamily: 'Open Sans',
    },
    bold: {
      fontWeight: 'bold',
    },
    row1: {
      width: '5%',
    },
    row2: {
      width: '40%',
    },
    row3: {
      width: '15%',
    },
    row4: {
      width: '20%',
    },
    row5: {
      width: '27%',
    },
    footer: {
      borderTop: '1px solid #EEE',
      textAlign: 'right',
      paddingTop: 10,
    },
  });

  const MyDocument = ({ customerInfo }) => {
    return (
      <Document>
        <Page>
          <View style={styles.section}>
            <Text style={styles.heading} font="Roboto">
              Счет на оплату
            </Text>
            <View style={styles.row}>
              <Text style={styles.label}>
                Наименование организации и адрес:{' '}
              </Text>
              <Text style={styles.text}>
                ЧП Авазбеков Алманбет Авазбекович г.Бишкек
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Получатель:</Text>
              <Text style={styles.text}>
                {' '}
                ЗАО "Кыргызcкий Инвестиционно-Кредитный Банк" р/с
                1280166055179021
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>БИК 128016 ИНН № 22704198201352</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Реквизиты:</Text>
              <Text style={styles.text}>{customerInfo.payment}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Кому:</Text>
              <Text style={styles.text}>{customerInfo.customer}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Телефон:</Text>
              <Text style={styles.text}>{customerInfo.phone}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Адрес доставки:</Text>
              <Text style={styles.text}>{customerInfo.address}</Text>
            </View>
          </View>
          <View style={styles.table}>
            <Text style={styles.heading}>Список товаров</Text>
            <View style={[styles.arow, styles.bold, styles.header]}>
              <Text style={styles.row1}>№</Text>
              <Text style={styles.row2}>Наименование товара</Text>
              <Text style={styles.row3}>Ед.изм.</Text>
              <Text style={styles.row4}>Количество</Text>
              <Text style={styles.row5}>Цена</Text>
              <Text style={styles.row5}>Скидка</Text>
              <Text style={styles.row5}>Цена со скидкой</Text>
            </View>
            {customerInfo?.order?.map((row, i) => (
              <View key={i} style={styles.arow} wrap={false}>
                <Text style={styles.row1}>
                  <Text style={styles.bold}>{i + 1}</Text>
                </Text>
                <Text style={styles.row2}>
                  <Text style={styles.bold}>{row.product.title}</Text>
                </Text>
                <Text style={styles.row3}>
                  {row.product.unit ? row.product.unit : 'шт.'}
                </Text>
                <Text style={styles.row4}>{row.quantity}</Text>
                <Text style={styles.row5}>{row.product.price} сом</Text>
                <Text style={styles.row5}>
                  {row.product.price - row.price} сом
                </Text>
                <Text style={styles.row5}>{row.price} сом</Text>
              </View>
            ))}
            <Text style={styles.footer}>
              Итоговая цена{' '}
              {order?.order.reduce(
                (acc, curr) => acc + curr.quantity * curr.price,
                0
              )}{' '}
              сом
            </Text>
          </View>
        </Page>
      </Document>
    );
  };

  const handleDownload = async () => {
    const blob = await pdf(MyDocument({ customerInfo: order })).toBlob();
    saveAs(blob, 'order-checkout.pdf');
  };

  return (
    <div className="container-xs">
      <div className="order-display">
        <h2>Заказ был принят</h2>
        <p>Спасибо. Ваш заказ был принят.</p>
        <table className="order-display__info-table">
          <tr style={{ textAlign: 'center' }}>
            <td>Счет на оплату</td>
          </tr>
          <tr>
            <td>
              <b>Наименование организации и адрес:</b> ЧП Авазбеков Алманбет
              Авазбекович г.Бишкек
            </td>
          </tr>
          <tr>
            <td>
              Получатель: ЗАО "Кыргызcкий Инвестиционно-Кредитный Банк" р/с
              1280166055179021
            </td>
          </tr>
          <tr>
            <td>БИК 128016 ИНН № 22704198201352</td>
          </tr>
          <tr>
            <td>
              <b>Реквизиты:</b>{' '}
              {order?.payment === 'Optima'
                ? 'Optima Bank 4169585340501575'
                : 'МБанк | Элсом | О!Деньги +996(709)403-955'}
            </td>
          </tr>
          <tr>
            <td>
              <b>Кому:</b> {order?.customer}
            </td>
          </tr>
          <tr>
            <td>
              <b>Телефон:</b> {order?.phone}
            </td>
          </tr>
          <tr>
            <td>
              <b>Адрес доставки:</b> {order?.address}
            </td>
          </tr>
        </table>
        <div className="order-display__wrapper">
          <table className="order-display__products-table">
            <tr>
              <td>№</td>
              <td>Наименование товара</td>
              <td>Ед. изм.</td>
              <td>Количество</td>
              <td>Цена</td>
              <td>Скидка</td>
              <td>Цена со скидкой</td>
            </tr>
            {order && order?.order?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.product.title}</td>
                <td>{item.product.unit ? item.product.unit : 'шт.'}</td>
                <td>{item.quantity}</td>
                <td>{item.product.price} сом</td>
                <td>{item.product.price - item.price} сом</td>
                <td>{item.price} сом</td>
              </tr>
            ))}
            <tr>
              <td colSpan={7} style={{ textAlign: 'right' }}>
                Итоговая цена:{' '}
                {order?.order?.reduce(
                  (acc, curr) => acc + curr.quantity * curr.price,
                  0
                )}{' '}
                сом
              </td>
            </tr>
          </table>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            className="button"
            onClick={handleDownload}
            style={{ margin: '10px 0' }}
          >
            Сохранить счет на оплату
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCheckout;
