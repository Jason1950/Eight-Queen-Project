import numpy as np

queenArray = [[0, 1, 0, 0], 
 [0, 0, 0, 1],
 [1, 0, 0, 0], 
 [0, 0, 1, 0],];

queenArray2 = [[0,1],[1,0]]; #(0,1)
queenArray3 = [[1,0],[0,1]]; #(1,0)

# print('123');

# def queen(list):
#     print(f'queen function {list}');

# queen(queenArray);

# make a function that likes : queens(n, state)

# def queens(n, state):
#     ans = [] #記錄在state棋子已經放好的狀況下，後續的所有解答
#     for 位置 in range(n): #嘗試在下一列中放新的皇后
#         if 這個位置不在前面皇后的攻擊範圍:
#             ans 添加所有來自queens(n, state+(位置, ))的解答
#     return ans

# 接著寫個判斷是否可放置棋子的功能
# conflict(state, nextX)

#  state = (0,) or (1,) ... (n-1,) , n=8
# def conflict(state, nextX):    
#     nextY = len(state)
#     if any(abs(state[i] - nextX)== 0 for i in range(len(state))): #同行
#         return True
#     if any(abs(state[i] - nextX)== nextY - i for i in range(len(state))): #同對角線
#         return True
#     return False


def failCheck(quennNowArray, nextQueen):
    for i in range(len(quennNowArray)):
        if (quennNowArray[i]-nextQueen) == 0:
            return True
        if abs(quennNowArray[i]-nextQueen) == (len(quennNowArray)-i):
            return True
    return False


# if not conflict(state, pos):
#     ans += [(pos,)+ result for result in queens(n, state + (pos,))]

def queens(quennNowArray=(), chessSize=2):
    if len(quennNowArray) == chessSize: 
        return [()]
    queenArray =[]
    for i in range(chessSize):
        if not failCheck(quennNowArray, i):
            print([(i,)  +(1,2) ]) # result for result in queens(quennNowArray + (i,), chessSize)])
            for result in queens(quennNowArray + (i,), chessSize):
                print('result',result)
            queenArray=0
    return (i,)
print(failCheck((3,),1));

queens();



# it's great function !! 

def conflict(state, nextX):    
    nextY = len(state)
    return any(abs(state[i] - nextX) in (0, nextY - i) for i in range(nextY))

def queens2(n, state=()):
    if len(state) == n: 
        return [()]
    ans = []
    for pos in range(n):
        if not conflict(state, pos):
            ans += [(pos,)+ result for result in queens2(n, state + (pos,))]
    return ans

chessSize = 4
array1 = queens2(chessSize)
print(array1[0])
print(array1[1])
print(len(array1))


# for i in range(chessSize):
#     # for j in range(chessSize):
#         if i==(chessSize-1):
#             # print('x')
#             if i == array1[1][0]:
#                 print('Q')
#             else:
#                 print('.')
#         else:
#             if i == array1[1][0]:
#                 print('Q' , end = '')
#             else:
#                 print('.' , end = '')

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