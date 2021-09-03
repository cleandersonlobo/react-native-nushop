import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from 'core/colors';
import { Separator } from 'components';

const OffersEmpty = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="local-offer" size={48} color={AppColors.gray} />
      <Separator />
      <View>
        <Text style={styles.text}>Nenhum oferta.</Text>
      </View>
    </View>
  );
};

export default OffersEmpty;

const styles = StyleSheet.create({
  container: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: AppColors.darkLight,
    lineHeight: 24,
  },
});
