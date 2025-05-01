"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { MoreVertical, Trash2, Eye, Mail, MailOpen } from "lucide-react";
import {
  useGetAllMessageQuery,
  useDeleteMessageMutation,
  useMarkReadMessageMutation,
} from "@/redux/features/messages/messageApi";
import toast from "react-hot-toast";
import LoadingPage from "./loading";

type TMessage = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function MessagesListPage() {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<TMessage | null>(null);
  const { data: messagesData, isLoading } = useGetAllMessageQuery(undefined);
  const [markAsRead] = useMarkReadMessageMutation();
  const [deleteMessage] = useDeleteMessageMutation();

  const handleView = async (message: TMessage) => {
    setSelectedMessage(message);
    setIsViewModalOpen(true);

    if (!message.isRead) {
      try {
        await markAsRead(message._id).unwrap();
        toast.success("Message read successfully");
      } catch (error) {
        toast.error("Failed to mark message as read");
      }
    }
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting message...");
    try {
      await deleteMessage(id).unwrap();
      toast.success("Message deleted successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete message", { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingPage />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messages</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Total: {messagesData?.data?.length || 0}
          </span>
          <span className="text-sm text-gray-500">
            Unread:{" "}
            {messagesData?.data?.filter((msg: TMessage) => !msg.isRead)
              .length || 0}
          </span>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Received</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {messagesData?.data?.map((message: TMessage) => (
              <TableRow
                key={message._id}
                className={
                  !message.isRead ? "bg-blue-50 dark:bg-blue-950/20" : ""
                }
              >
                <TableCell>
                  {message.isRead ? (
                    <MailOpen className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Mail className="h-4 w-4 text-blue-500" />
                  )}
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{message.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {message.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>
                  {format(new Date(message.createdAt), "MMM d, yyyy h:mm a")}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleView(message)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-red-600 dark:text-red-400"
                        onClick={() => handleDelete(message._id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-[100px,1fr] gap-2">
                <span className="text-gray-500">From:</span>
                <div>
                  <p className="font-medium">{selectedMessage?.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedMessage?.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-[100px,1fr] gap-2">
                <span className="text-gray-500">Subject:</span>
                <p>{selectedMessage?.subject}</p>
              </div>

              <div className="grid grid-cols-[100px,1fr] gap-2">
                <span className="text-gray-500">Received:</span>
                <p>
                  {selectedMessage &&
                    format(new Date(selectedMessage.createdAt), "PPpp")}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-gray-500">Message:</span>
                <p className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg whitespace-pre-wrap">
                  {selectedMessage?.message}
                </p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
