import React, { Component } from 'react';
import { Button, Modal, Text, View } from 'react-native';

export default class Dialog extends Component {
  onCancel = () => {
    this.props.onCancel();
  };

  onConfirm = () => {
    this.props.onConfirm();
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {}}
        {...this.props}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            backgroundColor: '#00000088'
          }}>
          <View
            style={{
              padding: 10,
              width: '100%',
              justifyContent: 'center',
              backgroundColor: 'white'
            }}>
            <Text>{this.props.title || 'Dialog'}</Text>
            {this.props.content()}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around'
              }}>
              <Button
                style={{ flex: 1 }}
                title={this.props.cancelLabel || 'Annuler'}
                onPress={() => this.onCancel()}
                color="#EE4030"
              />
              <Button
                style={{ flex: 1 }}
                title={this.props.confirmLabel || 'Valider'}
                onPress={() => this.onConfirm()}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
