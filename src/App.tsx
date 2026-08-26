import { useAssessment } from './hooks/useAssessment';
import { HFMSE_ITEMS } from './data/hfmseScaleData';
import { HomeScreen } from './pages/HomeScreen';
import { AssessmentScreen } from './pages/AssessmentScreen';
import { ReviewScreen } from './pages/ReviewScreen';
import { ResultScreen } from './pages/ResultScreen';
import { HistoryScreen } from './pages/HistoryScreen';
import { DetailScreen } from './pages/DetailScreen';
import { ReportScreen } from './pages/ReportScreen';

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
  } = useAssessment();

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
