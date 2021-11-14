class Queen(object):
    def __init__(self, size):
        self.size = size
        
    def failCheck(self,quennNowArray, nextQueen):
        for i in range(len(quennNowArray)):
            if (quennNowArray[i]-nextQueen) == 0:
                return True
            if abs(quennNowArray[i]-nextQueen) == (len(quennNowArray)-i):
                return True
        return False

    def queens(self,quennNowArray=(), chessSize=2):
        if len(quennNowArray) == chessSize: 
            return [()]
        queenArray =[]
        for i in range(chessSize):
            if not self.failCheck(quennNowArray, i):
                for result in self.queens(quennNowArray + (i,), chessSize):
                    queenArray += [(i,) + result]
        return queenArray

    def Q(self, array1, chessSize):
        for k in range(len(array1)):
            print(f'This is the {k+1} ans!')
            for j in range(chessSize):
                for i in range(chessSize):
                    if i == array1[k][j]:
                        print('Q' , end = '')
                    else:
                        print('.' , end = '')
                print('')
            print('\n')

    def main(self):
        arr = self.queens((), self.size)
        self.Q(arr, self.size)
        print(f'The eight queen puzzle size is  {self.size} ! \n')
        print(f'There are {len(arr)} anws !')


if __name__ == '__main__':
    Queen(6).main()
