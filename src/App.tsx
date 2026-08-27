import { useCallback, useEffect, useState } from 'react';
import { useAssessment } from './hooks/useAssessment';
import { storageService, VaultResult } from './services/storageService';
import { HFMSE_ITEMS } from './data/hfmseScaleData';
import { HomeScreen } from './pages/HomeScreen';
import { AssessmentScreen } from './pages/AssessmentScreen';
import { ReviewScreen } from './pages/ReviewScreen';
import { ResultScreen } from './pages/ResultScreen';
import { HistoryScreen } from './pages/HistoryScreen';
import { DetailScreen } from './pages/DetailScreen';
import { ReportScreen } from './pages/ReportScreen';
import { StorageUnlockScreen } from './pages/StorageUnlockScreen';

export function App() {
  const {
    view,
    setView,
    draft,
    history,
    selectedAssessment,
    startNewAssessment,
    resumeDraft,
    discardDraft,
    setItemScore,
    nextItem,
    prevItem,
    jumpToItem,
    finalizeAssessment,
    deleteAssessment,
    clearAllHistory,
    viewDetail,
    viewReport,
    loadStoredAssessments,
  } = useAssessment();
  const [vaultReady, setVaultReady] = useState(false);
  const [hasExistingVault, setHasExistingVault] = useState(() => storageService.isVaultConfigured());

  const lockVault = useCallback(() => {
    storageService.lockVault();
    setVaultReady(false);
    setView('home');
  }, [setView]);

  useEffect(() => {
    if (!vaultReady) return undefined;

    const inactivityLimit = 15 * 60 * 1000;
    let timeoutId: number;
    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(lockVault, inactivityLimit);
    };
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((eventName) => window.addEventListener(eventName, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      window.clearTimeout(timeoutId);
      events.forEach((eventName) => window.removeEventListener(eventName, resetTimer));
    };
  }, [lockVault, vaultReady]);

  const handleVaultSubmit = async (passphrase: string): Promise<VaultResult> => {
    const result = hasExistingVault
      ? await storageService.unlockVault(passphrase)
      : await storageService.setupVault(passphrase);

    if (result.success) {
      loadStoredAssessments();
      setVaultReady(true);
      setHasExistingVault(true);
    }
    return result;
  };

  const handleClearVault = () => {
    storageService.clearVault();
    setHasExistingVault(false);
  };

  if (!vaultReady) {
    return (
      <StorageUnlockScreen
        hasExistingVault={hasExistingVault}
        onSubmit={handleVaultSubmit}
        onClearVault={handleClearVault}
      />
    );
  }

  // Obter item atual da escala HFMSE
  const currentItemIndex = (draft?.currentItem || 1) - 1;
  const currentScaleItem = HFMSE_ITEMS[currentItemIndex] || HFMSE_ITEMS[0];

  switch (view) {
    case 'assessment':
      if (!draft) {
        return (
          <HomeScreen
            draft={draft}
            onStartNew={startNewAssessment}
            onResumeDraft={resumeDraft}
            onDiscardDraft={discardDraft}
            onNavigateHistory={() => setView('history')}
          />
        );
      }
      return (
        <AssessmentScreen
          draft={draft}
          item={currentScaleItem}
          totalItems={33}
          onSelectScore={setItemScore}
          onNext={nextItem}
          onPrev={prevItem}
          onExit={() => setView('home')}
          onNavigateReview={() => setView('review')}
        />
      );

    case 'review':
      if (!draft) {
        return (
          <HomeScreen
            draft={draft}
            onStartNew={startNewAssessment}
            onResumeDraft={resumeDraft}
            onDiscardDraft={discardDraft}
            onNavigateHistory={() => setView('history')}
          />
        );
      }
      return (
        <ReviewScreen
          draft={draft}
          onEditItem={jumpToItem}
          onBackToAssessment={() => setView('assessment')}
          onFinalize={finalizeAssessment}
        />
      );

    case 'result':
      if (!selectedAssessment) {
        return (
          <HomeScreen
            draft={draft}
            onStartNew={startNewAssessment}
            onResumeDraft={resumeDraft}
            onDiscardDraft={discardDraft}
            onNavigateHistory={() => setView('history')}
          />
        );
      }
      return (
        <ResultScreen
          assessment={selectedAssessment}
          onStartNew={() => setView('home')}
          onNavigateHistory={() => setView('history')}
          onNavigateReport={viewReport}
        />
      );

    case 'history':
      return (
        <HistoryScreen
          history={history}
          onSelectAssessment={viewDetail}
          onDeleteAssessment={deleteAssessment}
          onClearAll={clearAllHistory}
          onStartNew={() => setView('home')}
          onBackToHome={() => setView('home')}
        />
      );

    case 'detail':
      if (!selectedAssessment) {
        return (
          <HistoryScreen
            history={history}
            onSelectAssessment={viewDetail}
            onDeleteAssessment={deleteAssessment}
            onClearAll={clearAllHistory}
            onStartNew={() => setView('home')}
            onBackToHome={() => setView('home')}
          />
        );
      }
      return (
        <DetailScreen
          assessment={selectedAssessment}
          onBack={() => setView('history')}
          onNavigateReport={viewReport}
          onDelete={deleteAssessment}
        />
      );

    case 'report':
      if (!selectedAssessment) {
        return (
          <HomeScreen
            draft={draft}
            onStartNew={startNewAssessment}
            onResumeDraft={resumeDraft}
            onDiscardDraft={discardDraft}
            onNavigateHistory={() => setView('history')}
          />
        );
      }
      return (
        <ReportScreen
          assessment={selectedAssessment}
          onBack={() => setView('detail')}
        />
      );

    case 'home':
    default:
      return (
        <HomeScreen
          draft={draft}
          onStartNew={startNewAssessment}
          onResumeDraft={resumeDraft}
          onDiscardDraft={discardDraft}
          onNavigateHistory={() => setView('history')}
        />
      );
  }
}

export default App;
