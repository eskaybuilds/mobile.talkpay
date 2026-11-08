// Expo's winter runtime installs lazy globals whose getters `require` on first read. Jest rejects that
// once the test scope has closed, so the modules they load are mocked here. SDK 58 loads from build/.
jest.mock('expo/build/winter/ImportMetaRegistry', () => ({
  ImportMetaRegistry: {
    get url() {
      return null;
    },
  },
}));
jest.mock('@ungap/structured-clone', () => ({
  __esModule: true,
  default: <T>(value: T): T => JSON.parse(JSON.stringify(value)),
}));
