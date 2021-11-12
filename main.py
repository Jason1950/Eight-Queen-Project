import numpy as np

queenArray = [[0, 1, 0, 0], 
 [0, 0, 0, 1],
 [1, 0, 0, 0], 
 [0, 0, 1, 0],];

# print('123');

def queen(list):
    print(f'queen function {list}');

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

#  state = (0,) or (1,) ... (n,) , n=8
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

print(failCheck((3,),1));