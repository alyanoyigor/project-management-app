import { useEffect, useState } from 'react';
import { CircularProgress, Container, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { removeUser, removeError as removeErrorAuth } from '../../store/authSlice';
import { removeError as removeErrorMain } from '../../store/boardSlice';
import { removeError as removeErrorBoard } from '../../store/mainSlice';
import { removeError as removeErrorSearch } from '../../store/searchSlice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ModalWithText } from '../ModalWithText';
import { useTranslation } from 'react-i18next';

export const AppLayout = () => {
  const dispatch = useAppDispatch();
  const { error: errorMainBoard } = useAppSelector((state) => state.mainBoards);
  const { error: errorBoard } = useAppSelector((state) => state.boardState);
  const { error: errorSearch } = useAppSelector((state) => state.tasksState);
  const {
    authUser: { error: errorAuth },
  } = useAppSelector((state) => state.authUser);
  const [showModal, setShowModal] = useState(false);
  const [showConnectionMessage, setShowConnectionMessage] = useState(false);
  const handleCloseConnectionMessage = () => setShowConnectionMessage(false);
  const { t } = useTranslation(['common']);

  useEffect(() => {
    if (
      errorMainBoard === '401' ||
      errorBoard === '401' ||
      errorAuth === '401' ||
      errorSearch === '401'
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('login');
      dispatch(removeErrorMain());
      dispatch(removeErrorBoard());
      dispatch(removeErrorSearch());
      dispatch(removeUser());
      setShowModal(true);
    }
    if (
      errorMainBoard === 'Network Error' ||
      errorBoard === 'Network Error' ||
      errorAuth === 'Network Error' ||
      errorSearch === 'Network Error'
    ) {
      dispatch(removeErrorMain());
      dispatch(removeErrorBoard());
      dispatch(removeErrorAuth());
      dispatch(removeErrorSearch());
      setShowConnectionMessage(true);
    }
  }, [dispatch, errorMainBoard, errorBoard, errorAuth, errorSearch]);

  return (
    <>
      <Header />
      <main>
        <Container maxWidth={false}>
          <Suspense
            fallback={
              <Container sx={{ pt: '15vh', ml: '45%' }} maxWidth={false}>
                <CircularProgress />
              </Container>
            }
          >
            <Outlet />
          </Suspense>
          {showModal && (
            <>
              <ModalWithText
                isOpen={showModal}
                alertText={t('SessionOut')}
                closeModal={() => setShowModal(false)}
              />
            </>
          )}
          {showConnectionMessage && (
            <Snackbar
              open={showConnectionMessage}
              autoHideDuration={5000}
              onClose={handleCloseConnectionMessage}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              message={t('ConnectionError')}
              action={
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleCloseConnectionMessage}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
            />
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
};
