import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    marginLeft: '50px'
  },
  button: {
    padding: 8,
  },
  disabledButton: {
    opacity: 0.5,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '50%'
  },
});