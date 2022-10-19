import React from 'react'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';




const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

const Pdf = ({ order }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>order id</Text>
                    <Text>{order.customer_order_id}</Text>

                </View>
                <View style={styles.section}>
                    <Text>full name</Text>
                    <Text>{`${order.first_name} ${order.last_name}`}</Text>
                </View>
                <View style={styles.section}>
                    <Text>grand total</Text>
                    <Text> {order.grand_total}</Text>
                </View>
            </Page>
        </Document>
    )
}


export default Pdf