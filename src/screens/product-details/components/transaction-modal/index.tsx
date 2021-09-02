import React from 'react';
import {
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import { AppColors } from 'core/colors';
import { Ionicons } from '@expo/vector-icons';
import { NuButton, Separator } from 'components';
import { SeparatorSizes } from 'components/separator';
import { useNavigation } from '@react-navigation/native';
import { WalletRoutes } from 'screens/wallet/routes';
import { RootRoutes } from 'navigation/routes';

const TransactionModal: React.FC<{
  visible?: boolean;
  status?: string;
  onClose: () => void;
}> = ({ visible, status = 'success', onClose }) => {
  const navigation = useNavigation();

  const navigateToWallet = () => {
    onClose?.();
    navigation.navigate(
      RootRoutes.AppStack as never,
      {
        screen: WalletRoutes.Home,
      } as never,
    );
  };
  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onDismiss={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modal}>
          <View style={styles.content}>
            <View style={styles.contentText}>
              <Ionicons
                name={
                  status === 'success' ? 'md-happy-outline' : 'md-sad-outline'
                }
                size={60}
                color={
                  status === 'success' ? AppColors.success : AppColors.secondary
                }
              />
              <Separator size={SeparatorSizes.M} />
              <Text style={styles.text}>
                {status === 'success'
                  ? 'Compra realizada com sucesso!'
                  : 'Saldo insuficiente.'}
              </Text>
              <Separator size={SeparatorSizes.L} />
            </View>
            {status === 'success' && (
              <>
                <NuButton
                  text="Fechar"
                  variant="outline"
                  fullWidth
                  onPress={onClose}
                />
                <Separator size={SeparatorSizes.M} />

                <NuButton
                  text="Ver histórico"
                  fullWidth
                  onPress={navigateToWallet}
                />
              </>
            )}
            {status === 'without-balance' && (
              <NuButton
                text="Fechar"
                variant="outline"
                fullWidth
                onPress={onClose}
              />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TransactionModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },
  text: {
    fontSize: 18,
    color: AppColors.dark,
    paddingHorizontal: 20,
    fontWeight: '500',
  },
  contentText: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'space-between',
    top: '25%',
    backgroundColor: AppColors.white,
    padding: 20,
    minHeight: 230,
    minWidth: 280,
    borderRadius: 20,
    shadowColor: AppColors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
