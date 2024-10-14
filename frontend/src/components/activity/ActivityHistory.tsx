import React, { useState } from "react";
import { useActivityHistory } from "./../../API/useActivityHistory";
import RecommendationDisplay from "./../../components/shared/RecommendationDisplay";
import ChatLoader from "./../../components/shared/ChatLoader";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const ActivityHistory: React.FC = () => {
  const {
    history,
    loading,
    handleFavoriteToggle,
    handleDeleteActivity,
    confirmDeleteActivity,
    activityToDelete,
  } = useActivityHistory();
  const [openDialog, setOpenDialog] = useState(false);

  if (loading) {
    return <ChatLoader />;
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-sm md:text-lg font-semibold text-primary mb-4">
        Din aktivitetshistorik:
      </h2>

      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry) => (
            <li
              key={entry._id}
              className="relative border p-4 rounded-lg bg-gray-50"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="md:order-2 flex md:space-x-2 mb-4 md:mb-0 ml-auto md:absolute md:top-4 md:right-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleFavoriteToggle(entry._id)}
                    size="icon"
                    className="p-0 hover:bg-transparent"
                  >
                    <FaHeart
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        entry.isFavorited ? "text-red-500" : "text-gray-500"
                      }`}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleDeleteActivity(entry._id);
                      setOpenDialog(true);
                    }}
                    size="icon"
                    className="p-0 hover:bg-transparent"
                  >
                    <FaRegTrashCan className="h-4 w-4 md:h-5 md:w-5 text-gray-500 hover:text-red-500" />
                  </Button>
                </div>

                <div className="md:order-1 text-xs md:text-sm lg:text-base">
                  <p className="mb-2">
                    <strong>Datum:</strong>{" "}
                    {new Date(entry.date).toLocaleString()}
                  </p>
                  <p className="mb-2">
                    <strong>Preferenser:</strong> {entry.preferences}
                  </p>
                  <RecommendationDisplay
                    recommendation={entry.recommendations}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ingen historik hittades.</p>
      )}

      {activityToDelete && (
        <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Bekräfta borttagning</AlertDialogTitle>
              <AlertDialogDescription>
                Är du säker på att du vill ta bort denna favoritaktivitet? Detta
                kan inte ångras.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenDialog(false)}>
                Avbryt
              </AlertDialogCancel>
              <AlertDialogAction
                className="hover:bg-red-600"
                onClick={() => {
                  confirmDeleteActivity();
                  setOpenDialog(false);
                }}
              >
                Ja, ta bort
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default ActivityHistory;
