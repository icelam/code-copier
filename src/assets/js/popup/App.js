import popupHeader from './components/header';
import popupContentContainer from './components/contentContainer';
import landing from './pages/landing';

const app = {
  name: 'App',
  components: {
    popupHeader,
    popupContentContainer,
    landing
  },
  template: `
    <div>
      <popup-header />
      <popup-content-container>
        <landing />
      </popup-content-container>
    </div>
  `
};

export default app;
